// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/app/**': { ssr: false },
    '/auth/**': { ssr: false },
    '/**': { ssr: true },
  },
  app: {
    head: {
      title: 'Imobi',
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  modules: ['@nuxtjs/tailwindcss'],
})
