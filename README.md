# osu! Mania Timing Indicator

osu!maniaで判定がパーフェクトでなかった場合に、タイミングが早かった（FAST）か遅かった（SLOW）かを画面上に表示するオーバーレイツールです。

![Fast/Slow Indicator](https://via.placeholder.com/400x100/1a1a2e/ffffff?text=FAST+%2F+SLOW+Indicator)

## 特徴

- 🎯 **リアルタイム表示**: tosuを通じてosu!のタイミングデータをリアルタイムで取得
- 🎨 **視覚的にわかりやすい**: FAST（水色）/ SLOW（赤色）で色分け表示
- 📍 **位置カスタマイズ**: 画面上の好きな位置にインジケーターを配置可能
- ⚙️ **詳細設定**: フォントサイズ、不透明度、表示時間、判定閾値を調整可能

## 必要条件

1. **osu!** がインストールされていること
2. **[tosu](https://tosu.app/)** がインストールされ、起動していること

### tosuのインストール

1. [tosu Releases](https://github.com/tosuapp/tosu/releases/latest) から最新版をダウンロード
2. ダウンロードしたファイルを解凍
3. `tosu.exe`を実行
4. osu!を起動（tosuが自動的に接続します）
5. （オプション）ブラウザで http://127.0.0.1:24050 を開くとダッシュボードが表示されます

## インストール

### ビルド済みバイナリを使用する場合

1. [Releases](../../releases) ページから対応するOS用のファイルをダウンロード
2. ダウンロードしたファイルを解凍・インストール
3. アプリケーションを起動

### ソースからビルドする場合

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
3. **osu! Mania Timing Indicator** を起動する
4. osu!maniaをプレイすると、パーフェクト判定でない場合に FAST または SLOW が表示されます

### 設定画面を開く

- **ショートカットキー**: `Ctrl + Shift + O`

### 設定項目

| 項目 | 説明 | デフォルト値 |
|------|------|--------------|
| WebSocket URL | tosuの接続先URL | `ws://127.0.0.1:24050/ws` |
| フォントサイズ | 表示される文字の大きさ | 24px |
| 不透明度 | インジケーターの透明度 | 90% |
| 判定閾値 | FAST/SLOWが表示される判定の閾値 | 200以下 |
| 位置 (X, Y) | 画面上の表示位置 | 画面中央 |
| 表示時間 | FAST/SLOWが表示される時間 | 1000ms |

### 位置の調整

1. `Ctrl + Shift + O` で設定画面を開く
2. 「ドラッグで位置調整」ボタンをクリック
3. オーバーレイ上でマウスをドラッグして位置を調整
4. もう一度ボタンをクリックして確定
5. 「設定を保存」ボタンで保存

## 開発
開発に関する情報は [README.dev.md](README.dev.md) を参照してください。

## トラブルシューティング

### 接続できない場合

1. tosuが起動しているか確認してください
2. tosuのポートが24050であることを確認してください
3. ファイアウォールがWebSocket接続をブロックしていないか確認してください
4. 設定画面でWebSocket URLが正しいか確認してください

## ライセンス

MIT License

## 謝辞

- [tosu](https://github.com/tosuapp/tosu) - osu!のメモリ読み取りツール
- [osu!](https://osu.ppy.sh/) - リズムゲーム
