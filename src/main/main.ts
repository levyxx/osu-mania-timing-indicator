import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron';
import * as path from 'path';
import WebSocket from 'ws';
import Store from 'electron-store';

// 設定のスキーマ定義
interface ConfigSchema {
  position: {
    x: number;
    y: number;
  };
  websocketUrl: string;
  displayDuration: number;
  fontSize: number;
  opacity: number;
}

const store = new Store<ConfigSchema>({
  defaults: {
    position: {
      x: -1, // -1は画面中央を意味する
      y: -1,
    },
    websocketUrl: 'ws://127.0.0.1:24050/ws',
    displayDuration: 500, // ms
    fontSize: 24,
    opacity: 0.9,
  },
});

let mainWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;
let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let lastHitErrorsLength = 0;

function createMainWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  const savedPosition = store.get('position');
  const windowWidth = 200;
  const windowHeight = 100;
  
  // 初期位置の計算（-1の場合は画面中央）
  const x = savedPosition.x === -1 ? Math.floor((width - windowWidth) / 2) : savedPosition.x;
  const y = savedPosition.y === -1 ? Math.floor(height / 2) : savedPosition.y;

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: x,
    y: y,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // クリックを透過させる
  mainWindow.setIgnoreMouseEvents(true);

  // src/rendererからHTMLを読み込み（開発時とビルド時の両方に対応）
  const rendererPath = app.isPackaged
    ? path.join(__dirname, '../renderer/index.html')
    : path.join(__dirname, '../../src/renderer/index.html');
  mainWindow.loadFile(rendererPath);

  // 開発時のみDevToolsを開く
  // mainWindow.webContents.openDevTools({ mode: 'detach' });
}

function createSettingsWindow(): void {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 450,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // src/rendererからHTMLを読み込み（開発時とビルド時の両方に対応）
  const settingsPath = app.isPackaged
    ? path.join(__dirname, '../renderer/settings.html')
    : path.join(__dirname, '../../src/renderer/settings.html');
  settingsWindow.loadFile(settingsPath);

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function connectWebSocket(): void {
  const wsUrl = store.get('websocketUrl');
  
  try {
    ws = new WebSocket(wsUrl);

    ws.on('open', () => {
      console.log('Connected to tosu WebSocket');
      if (mainWindow) {
        mainWindow.webContents.send('connection-status', true);
      }
    });

    ws.on('message', (data: WebSocket.Data) => {
      try {
        const gameData = JSON.parse(data.toString());
        processGameData(gameData);
      } catch (error) {
        console.error('Failed to parse game data:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      if (mainWindow) {
        mainWindow.webContents.send('connection-status', false);
      }
      scheduleReconnect();
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      scheduleReconnect();
    });
  } catch (error) {
    console.error('Failed to create WebSocket:', error);
    scheduleReconnect();
  }
}

function scheduleReconnect(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  reconnectTimer = setTimeout(() => {
    console.log('Attempting to reconnect...');
    connectWebSocket();
  }, 3000);
}

interface GameData {
  gameplay?: {
    hits?: {
      hitErrorArray?: number[];
    };
  };
  menu?: {
    state?: number;
    gameMode?: number;
  };
}

function processGameData(gameData: GameData): void {
  // osu!mania（gameMode === 3）かつプレイ中（state === 2）のみ処理
  const gameMode = gameData.menu?.gameMode;
  const state = gameData.menu?.state;
  
  // state: 0=menu, 1=edit, 2=play, 7=resultscreen, etc.
  if (state !== 2) {
    lastHitErrorsLength = 0;
    return;
  }

  // maniaモードのチェック（3がmania）
  // 全モードで動作させたい場合はこのチェックを外す
  if (gameMode !== 3) {
    return;
  }

  const hitErrors = gameData.gameplay?.hits?.hitErrorArray || [];
  
  // 新しいヒットエラーがあるかチェック
  if (hitErrors.length > lastHitErrorsLength) {
    const latestError = hitErrors[hitErrors.length - 1];
    lastHitErrorsLength = hitErrors.length;
    
    // hitErrorが0でない場合（パーフェクト判定でない場合）にFast/Slowを表示
    // 正の値 = 遅い（Slow）、負の値 = 早い（Fast）
    if (latestError !== 0) {
      const timing = latestError > 0 ? 'slow' : 'fast';
      const absError = Math.abs(latestError);
      
      if (mainWindow) {
        mainWindow.webContents.send('timing-indicator', {
          timing,
          error: absError,
          duration: store.get('displayDuration'),
        });
      }
    }
  } else if (hitErrors.length < lastHitErrorsLength) {
    // 新しい曲が始まった場合、リセット
    lastHitErrorsLength = hitErrors.length;
  }
}

// IPC handlers
ipcMain.on('get-config', (event) => {
  event.returnValue = {
    position: store.get('position'),
    websocketUrl: store.get('websocketUrl'),
    displayDuration: store.get('displayDuration'),
    fontSize: store.get('fontSize'),
    opacity: store.get('opacity'),
  };
});

ipcMain.on('save-config', (_, config: Partial<ConfigSchema>) => {
  if (config.position !== undefined) store.set('position', config.position);
  if (config.websocketUrl !== undefined) store.set('websocketUrl', config.websocketUrl);
  if (config.displayDuration !== undefined) store.set('displayDuration', config.displayDuration);
  if (config.fontSize !== undefined) store.set('fontSize', config.fontSize);
  if (config.opacity !== undefined) store.set('opacity', config.opacity);

  // メインウィンドウに設定変更を通知
  if (mainWindow) {
    mainWindow.webContents.send('config-updated', {
      fontSize: store.get('fontSize'),
      opacity: store.get('opacity'),
      displayDuration: store.get('displayDuration'),
    });
  }
});

ipcMain.on('update-position', (_, position: { x: number; y: number }) => {
  store.set('position', position);
  if (mainWindow) {
    mainWindow.setPosition(position.x, position.y);
  }
});

ipcMain.on('get-window-position', (event) => {
  if (mainWindow) {
    const [x, y] = mainWindow.getPosition();
    event.returnValue = { x, y };
  } else {
    event.returnValue = store.get('position');
  }
});

ipcMain.on('reconnect-websocket', () => {
  if (ws) {
    ws.close();
  }
  connectWebSocket();
});

ipcMain.on('open-settings', () => {
  createSettingsWindow();
});

ipcMain.on('enable-drag-mode', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send('drag-mode', true);
  }
});

ipcMain.on('disable-drag-mode', () => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.webContents.send('drag-mode', false);
  }
});

ipcMain.on('save-window-position', () => {
  if (mainWindow) {
    const [x, y] = mainWindow.getPosition();
    store.set('position', { x, y });
  }
});

app.whenReady().then(() => {
  createMainWindow();
  connectWebSocket();

  // Ctrl+Shift+Oで設定画面を開く
  globalShortcut.register('CommandOrControl+Shift+O', () => {
    createSettingsWindow();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (ws) {
    ws.close();
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
