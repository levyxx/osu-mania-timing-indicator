# osu! Mania Timing Indicator

osu!maniaで判定がパーフェクトでなかった場合に、タイミングが早かった（FAST）か遅かった（SLOW）かを画面上に表示するオーバーレイツールです。

![Fast/Slow Indicator](https://via.placeholder.com/400x100/1a1a2e/ffffff?text=FAST+%2F+SLOW+Indicator)

## 特徴

- 🎯 **リアルタイム表示**: tosuを通じてosu!のタイミングデータをリアルタイムで取得
- 🎨 **視覚的にわかりやすい**: FAST（水色）/ SLOW（赤色）で色分け表示
- 📍 **位置カスタマイズ**: 画面上の好きな位置にインジケーターを配置可能
- ⚙️ **詳細設定**: フォントサイズ、不透明度、表示時間を調整可能
- 🖥️ **クロスプラットフォーム**: Windows / Linux / macOS対応

## 必要条件

1. **osu!** がインストールされていること
2. **[tosu](https://tosu.app/)** がインストールされ、起動していること

### tosuのインストール

1. [tosu Releases](https://github.com/tosuapp/tosu/releases/latest) から最新版をダウンロード
2. ダウンロードしたファイルを解凍
3. `tosu.exe`（Windows）または`tosu`（Linux/macOS）を実行
4. osu!を起動（tosuが自動的に接続します）
5. ブラウザで http://127.0.0.1:24050 を開くとダッシュボードが表示されます

## インストール

### 📦 簡単インストール（推奨）

1. [Releases](../../releases/latest) ページから最新のWindows用インストーラーをダウンロード
   - **インストーラー版**: `osu-Timing-Indicator-Setup-x.x.x.exe`（通常のインストール、推奨）
   - **ポータブル版**: `osu-Timing-Indicator-x.x.x-portable.exe`（インストール不要、USBメモリでも使用可）
2. ダウンロードしたファイルを実行
3. インストーラー版の場合は画面の指示に従ってインストール
4. デスクトップまたはスタートメニューから起動

### 🛠️ ソースからビルドする場合

```bash
# リポジトリをクローン
git clone https://github.com/levyxx/osu-mania-timing-indicator.git
cd osu-mania-timing-indicator

# 依存関係をインストール
npm install

# 開発モードで起動
npm run dev

# または、ビルドして起動
npm run start
```

## 使い方

### 基本的な使い方

1. **tosu** を起動する
2. **osu!** を起動する
3. **osu! Timing Indicator** を起動する
4. osu!maniaをプレイすると、パーフェクト判定でない場合に FAST または SLOW が表示されます

### 設定画面を開く

- **ショートカットキー**: `Ctrl + Shift + O`

### 設定項目

| 項目 | 説明 | デフォルト値 |
|------|------|--------------|
| WebSocket URL | tosuの接続先URL | `ws://127.0.0.1:24050/ws` |
| フォントサイズ | 表示される文字の大きさ | 24px |
| 不透明度 | インジケーターの透明度 | 90% |
| フェードアウト時間 | FAST/SLOWが表示されてから消えるまでの時間 | 2.0秒 |
| 表示する判定 | どの判定以下で表示するか（1=常に表示、3=200以下など） | 200以下 |
| 位置 (X, Y) | 画面上の表示位置 | 画面中央 |

### 位置の調整

1. `Ctrl + Shift + O` で設定画面を開く
2. 「ドラッグで位置調整」ボタンをクリック
3. オーバーレイ上でマウスをドラッグして位置を調整
4. もう一度ボタンをクリックして確定
5. 「設定を保存」ボタンで保存

## 開発

### 開発環境のセットアップ

#### VS Code Dev Containers を使用する場合

1. VS Codeで「Dev Containers」拡張機能をインストール
2. このプロジェクトを開く
3. コマンドパレット (`F1`) で「Dev Containers: Reopen in Container」を選択
4. コンテナがビルドされ、開発環境が自動でセットアップされます

#### ローカル環境で開発する場合

```bash
# Node.js 20以上が必要です
node --version

# 依存関係のインストール
npm install

# TypeScriptのウォッチモード
npm run watch

# 別のターミナルで起動
npm run dev
```

### プロジェクト構造

```
osu-mania-timing-indicator/
├── .devcontainer/          # Dev Container設定
│   ├── devcontainer.json
│   └── Dockerfile
├── src/
│   ├── main/
│   │   └── main.ts         # Electronメインプロセス
│   ├── renderer/
│   │   ├── index.html      # オーバーレイ表示
│   │   └── settings.html   # 設定画面
│   └── types/
│       └── electron-store.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 技術スタック

- **Electron** - クロスプラットフォームデスクトップアプリ
- **TypeScript** - 型安全な開発
- **WebSocket** - tosuとのリアルタイム通信
- **electron-store** - 設定の永続化

## トラブルシューティング

### 接続できない場合

1. tosuが起動しているか確認してください
2. tosuのポートが24050であることを確認してください
3. ファイアウォールがWebSocket接続をブロックしていないか確認してください
4. 設定画面でWebSocket URLが正しいか確認してください

### FAST/SLOWが表示されない場合

1. osu!maniaモードでプレイしているか確認してください
2. パーフェクト判定の場合は表示されません（仕様）
3. 右下の接続インジケーター（●）が緑色になっているか確認してください

### 表示位置がおかしい場合

1. 設定画面で位置を -1, -1 にリセットすると画面中央に戻ります
2. 「ドラッグで位置調整」機能で再配置してください

## ライセンス

MIT License

## 謝辞

- [tosu](https://github.com/tosuapp/tosu) - osu!のメモリ読み取りツール
- [osu!](https://osu.ppy.sh/) - リズムゲーム