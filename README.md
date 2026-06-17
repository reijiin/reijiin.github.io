# スタジオ零二院 — reijiin.github.io

AI映像制作スタジオ公式サイト

## セットアップ

```bash
npm install
npm run dev
```

## チャンネル情報の編集

`pages/index.vue` の以下の部分を編集してください：

```ts
const channel = {
  name: 'チャンネル名',
  desc: 'チャンネルの説明',
  url: 'https://www.youtube.com/@チャンネルID',
  thumbnail: '', // サムネURL（任意）
}
```

## デプロイ

`main` ブランチにpushすると GitHub Actions が自動でビルド＆デプロイします。

初回のみ：GitHubリポジトリの **Settings → Pages → Source** を  
`Deploy from a branch` → **gh-pages** ブランチに設定してください。

## 技術スタック

- Nuxt 3 (Vue 3 + TypeScript)
- GitHub Pages (静的ホスティング)
- GitHub Actions (自動デプロイ)
