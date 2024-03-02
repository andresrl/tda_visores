// https://nuxt.com/docs/api/configuration/nuxt-config
// require('dotenv').config({path:'../.env'})
export default defineNuxtConfig({
  routeRules: {
    "/api/**": {
      proxy: { to: process.env.API_ENDPOINT + "/**" },
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: process.env.API_ENDPOINT,
      NODE_SERVER_URL: process.env.NODE_SERVER_URL || "http://localhost:4003",
      BACKEND_SERVER_URL: process.env.BACKEND_SERVER_URL,
    },
  },

  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  css: ["@/assets/scss/global.scss", "@/assets/scss/_vars.scss"],
  build: {
    loaders: {
      scss: {
        additionalData: `@import "~assets/scss/_vars.scss";`,
      },
    },
  },
});
