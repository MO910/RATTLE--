// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // vuetify
    css: [
        "vuetify/lib/styles/main.sass",
        "@mdi/font/css/materialdesignicons.min.css",
    ],
    build: {
        transpile: ["vuetify", "@vuepic/vue-datepicker"],
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
    // apollo and pinia
    modules: ["@nuxtjs/apollo", "@pinia/nuxt"],
    apollo: {
        clients: {
            default: {
                httpEndpoint: `${process.env.URL}/api/graphQl`,
            },
        },
    },
    //
    // auth: {
    //     origin: process.env.URL,
    //     basePath: "/api/auth",

    //     enableGlobalAppMiddleware: true,
    // },
});
