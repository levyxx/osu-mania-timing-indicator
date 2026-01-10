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