<template lang="pug">
v-navigation-drawer(rail)
    v-container.py-10.px-0.d-flex.flex-column.align-center.justify-space-around
        v-row.d-flex.align-start H
        v-row.d-flex.flex-column.justify-center
            v-btn(
                v-for="item in items"
                :to='item.to' nuxt
                color='blue' icon
                variant='text'
            ) 
                v-icon.text-white.text-secondary {{item.icon}}
                v-tooltip(activator="parent" :text="item.title")
        v-row.d-flex.align-end
            v-menu(
                transition="scroll-x-reverse-transition"
                :close-on-content-click='false'
                location='start' open-on-hover
            )
                template(v-slot:activator="{ props  }")
                    v-avatar(v-bind="props " color='teal') M
                v-list(flat)
                    v-list-item.text--secondary(
                        v-for='item, i in list' :key='i'
                        @click="item.action"
                    )
                        template(v-slot:prepend)
                            v-icon.text--secondary(size='small') {{item.icon}}
                        v-list-item-title {{item.title}}
                        template(v-slot:append v-if='item.hasSwitch')
                            v-switch(v-model='item.switch')
</template>
<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
export default {
    // props: ["dialog"],
    async setup() {
        const authStore = useAuthStore();
        return { authStore, ...storeToRefs(authStore) };
    },
    data: () => ({
        i: true,
        items: [
            {
                icon: "mdi-home",
                title: "home",
                to: "/",
            },
            {
                icon: "mdi-account-multiple",
                title: "groups",
                to: "/groups",
            },
        ],
        items2: ["home", "about"],
    }),
    computed: {
        list() {
            return [
                {
                    title: this.$vuetify.locale.t("$vuetify.settings"),
                    icon: "mdi-cog",
                    to: "/",
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.dark_mode"),
                    icon: "mdi-moon-waning-crescent",
                    hasSwitch: true,
                    switch: true,
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.logout"),
                    icon: "mdi-logout",
                    action: this.logout,
                },
            ];
        },
    },
};
</script>

<style lang="sass" scoped>
.v-container
    height: 100% !important
.v-btn--active .text--secondary
    color: white !important
</style>
