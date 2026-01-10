# リリース手順

このドキュメントはメンテナー向けのリリース手順です。

## 前提条件

- Node.js 20以上がインストールされていること
- 必要な依存関係がインストールされていること (`npm install`)

## ローカルでビルドする

### Windows向け

```bash
npm run package:win
```

生成されるファイル:
- `release/osu! Timing Indicator Setup x.x.x.exe` - インストーラー
- `release/osu! Timing Indicator-x.x.x-portable.exe` - ポータブル版

生成されるファイル:
- `release/osu! Timing Indicator-x.x.x.dmg` - DMG

## GitHub Releasesで公開する

### 1. バージョンアップ

`package.json` のバージョンを更新:

```json
{
  "version": "1.1.0"
}
```

### 2. コミットとタグ

```bash
git add package.json
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

### 3. GitHub Actionsによる自動ビルド

タグをプッシュすると、GitHub Actionsが自動的に:
1. Windows、Linux、macOS用にビルド
2. GitHub Releasesにアップロード

### 4. リリースノートを追加

1. [GitHub Releases](../../releases) ページを開く
2. 自動作成されたリリースを編集
3. リリースノートを記載:

```markdown
## 新機能
- 機能Aを追加
- 機能Bを改善

## バグ修正
- 問題Xを修正

## インストール方法

### Windows
- インストーラー: `osu-Timing-Indicator-Setup-1.1.0.exe`
- ポータブル版: `osu-Timing-Indicator-1.1.0-portable.exe`

## トラブルシューティング

### ビルドエラーが発生する

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュをクリア
npm run build:full
```

### アイコンが表示されない

`build/` ディレクトリに以下のアイコンを配置してください:
- `icon.ico` (Windows)
- `icon.png` (Linux)
- `icon.icns` (macOS)

アイコンツール: https://icoconverter.com/
