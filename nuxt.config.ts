// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  alias: {
    assets: "/<rootDir>/assets"
  },
  css: ["~/assets/main.css"],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in"
    }
  }
})
