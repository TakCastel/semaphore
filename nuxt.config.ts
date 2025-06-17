// https://nuxt.com/docs/api/configuration/nuxt-config
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      version: process.env.npm_package_version,
      tmdbApiKey: process.env.TMDB_API_KEY,
    },
  },

  vite: {
    plugins: [tsconfigPaths()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
  ],

  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Anton&display=swap",
        },
      ],
    },
  },

  css: ["/assets/css/main.css"],

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
});
