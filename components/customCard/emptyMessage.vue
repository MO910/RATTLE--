<template lang="pug">
v-row
    v-col.my-10.mx-15
        v-banner(icon="mdi-alert-circle-outline" color="warning" lines="one")
            template(#text) #[.text-h6 {{ translatedMessage }}]
            template(#actions)
                v-btn(:append-icon="btnIcon" @click='btnAction()') {{ translatedBtn }}
                    v-menu(v-if='this.options.length > 1' activator='parent')
                        v-list
                            v-list-item(
                                v-for="option in options"
                                :value="option.text"
                                @click='option.action'
                            )
                                v-list-item-title {{$vuetify.locale.t(`$vuetify.${option.text}`)}}
</template>

<script>
export default {
    props: {
        translate: { default: true },
        message: String,
        btn: String,
        options: Array,
    },
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
        btnIcon() {
            return this.options.length > 1 ? "mdi-menu-down" : "";
        },
    },
    methods: {
        btnAction() {
            console.log(this.options.length > 1);
            return this.options.length > 1 ? "" : this.options[0].action();
        },
    },
};
</script>
