import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  meta: {
    title: "الأربعون النووية",
    htmlAttrs: {
      dir: "rtl",
      lang: "ar",
    },
  },
  css: ["~/assets/fonts/fonts.css", "~/assets/main.css"],
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "ar",
        file: "ar.json",
      },
    ],
    lazy: true,
    langDir: "./lang",
    defaultLocale: "ar",
  },
});