// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            titleTemplate: "%s - rattel",
            title: "rattel",
            meta: [{ name: "description", content: "testttt Nuxt 3" }],
            script: [
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
                },
                {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js",
                },
                // {
                //     src: "js/inputNumber.js",
                // },
            ],
        },
    },
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
});
