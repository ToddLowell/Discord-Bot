export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Aigis - Discord Bot',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A fun and easy to use bot for Discord. Made for myself and friends but available to anyone who wants to give it a spin.',
      },

      // OpenGraph tags
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Aigis - Discord Bot',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'A fun and easy to use bot for Discord. Made for myself and friends but available to anyone who wants to give it a spin.',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://aigis-discord-bot.herokuapp.com/',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://aigis-discord-bot.herokuapp.com/avatar.jpg',
      },

      // Twitter tags
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@raaedkabir',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@raaedkabir',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://aigis-discord-bot.herokuapp.com/avatar.jpg',
      },

      // iOS tags
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Aigis - Discord Bot',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto:wght@100;300;400;500;700;900&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/main'],
  styleResources: {
    scss: ['~/assets/scss/abstracts/_mixins.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
