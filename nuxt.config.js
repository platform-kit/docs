export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",  

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Docs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  env: {
    GITHUB_URL: process.env.GITHUB_URL || 'http://github.com/platform-kit/docs'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-clipboard2.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/pwa'],

  bootstrapVue: {
    icons: true,
  },

  manifest: {
    name: process.env.PWA_NAME || 'Docs',    
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://content.nuxtjs.org/v1/
    "@nuxt/content",
    // https://www.npmjs.com/package/@nuxtjs/toast   
    '@nuxtjs/toast',
  ],

  content: {
    dir: process.env.CONTENT_DIRECTORY || 'content'
  },

  styleResources: {
    
  },

  server: {
    port: 8000,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
