# osu! Mania Timing Indicator

osu!maniaで判定がパーフェクトでなかった場合に、タイミングが早かった（FAST）か遅かった（SLOW）かを画面上に表示するオーバーレイツールです。表示位置や表示時間の変更機能、特定の判定以下の場合にのみ表示する機能などが搭載されています。

<img width="1919" height="1079" alt="スクリーンショット 2026-01-10 173916" src="https://github.com/user-attachments/assets/934b6c44-80ba-44e9-8fce-b4b8264fa5da" />

## 必要条件

1. **osu!** がインストールされていること
2. **[tosu](https://tosu.app/)** がインストールされ、起動していること

### tosuのインストール

1. [tosu Releases](https://github.com/tosuapp/tosu/releases/latest) から最新版をダウンロード
2. ダウンロードしたファイルを解凍
3. `tosu.exe`を実行
4. osu!を起動（tosuが自動的に接続します）

## インストール

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
