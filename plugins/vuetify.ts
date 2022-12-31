import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// translation
import en from "../lang/en";
import ar from "../lang/ar";

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: "dark",
        },
        locale: {
            locale: "ar",
            messages: { ar, en },
            rtl: { ar: true },
        },
    });

    nuxtApp.vueApp.use(vuetify);
});
