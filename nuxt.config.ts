// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nome da aplicação
  app: {
    head: {
      title: 'Imobi',
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  modules: ['@nuxtjs/tailwindcss'],
})
