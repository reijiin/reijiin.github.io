export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    baseURL: '/',
    head: {
      title: 'スタジオ零二院 | STUDIO REIJIIN',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AI映像制作スタジオ — スタジオ零二院' },
        { property: 'og:title', content: 'スタジオ零二院 | STUDIO REIJIIN' },
        { property: 'og:description', content: 'AI映像制作スタジオ — スタジオ零二院' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Orbitron:wght@400;700;900&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/global.css'],
  compatibilityDate: '2025-01-01',
})