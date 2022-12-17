// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // vuetify
    css: [
        "vuetify/lib/styles/main.sass",
        "@mdi/font/css/materialdesignicons.min.css",
    ],
    build: {
        transpile: ["vuetify"],
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    // env vars
    runtimeConfig: {
        MONGO_URL: process.env.MONGO_URL,
    },
    // apollo
    modules: ["@nuxtjs/apollo"],
    apollo: {
        clients: {
            default: {
                httpEndpoint: `${process.env.URL}/api/graphQl`,
            },
        },
    },
    // pinia
    modules: ["@pinia/nuxt"],
});
