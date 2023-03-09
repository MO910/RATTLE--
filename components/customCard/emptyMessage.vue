<template lang="pug">
v-row
    v-col.my-10.mx-15
        v-banner(icon="mdi-alert-circle-outline" color="warning" lines="one")
            template(#text) #[.text-h6 {{ translatedMessage }}]
            template(#actions)
                v-menu
                    template(#activator="{ props }")
                        v-btn(v-bind="props") {{ translatedBtn }}
                    v-list
                        v-list-item(
                            v-for="option in options"
                            :value="option.text"
                            @click='option.action'
                        )
                            v-list-item-title {{$vuetify.locale.t(`$vuetify.${option.text}`)}}
</template>

<script>
// // Stores
// import { storeToRefs } from "pinia";
// import { useCustomCardStore } from "~/store/customCard";
// // components
// import linkOr from "./linkOr";
// import contextmenu from "~/components/customCard/contextmenu";

export default {
    props: {
        translate: { default: true },
        message: String,
        btn: String,
        btnAction: Function,
        options: Object,
    },
    // setup() {
    //     // use groups data
    //     const customCardStore = useCustomCardStore();
    //     // return the store
    //     return { ...storeToRefs(customCardStore) };
    // },
    computed: {
        translatedMessage() {
            return this.translate
                ? this.$vuetify.locale.t(`$vuetify.${this.message}`)
                : this.message;
        },
        translatedBtn() {
            return this.translate
                ? this.$vuetify.locale.t(`$vuetify.${this.btn}`)
                : this.btn;
        },
    },
};
</script>
