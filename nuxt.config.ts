// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // serverMiddleware: [{ path: "/apii", handler: "~/server-middleware/index.ts" }],
    css: ["vuetify/lib/styles/main.sass", "@mdi/font/css/materialdesignicons.min.css"],
    build: {
        transpile: ["vuetify"],
    },
    vite: {
        define: {
        "process.env.DEBUG": false,
        },
    },
});
