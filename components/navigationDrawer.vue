<template lang="pug">
v-navigation-drawer(rail)
    v-container.py-10.px-0.d-flex.flex-column.align-center.justify-space-around
        v-row.d-flex.align-start H
        v-row.d-flex.flex-column.justify-center
            div(v-for='item in items2')
                v-tooltip( :text="item")
                    template(v-slot:activator="{ props }")
                        v-btn(v-bind="props") Tooltip
            //- v-tooltip(v-for='item in items' :text='item.title')
                template(v-slot:activator="{ props }")
                    NuxtLink(v-slot="{ navigate }" :to='item.to')
                        v-btn(
                            v-bind="props"
                            :value="item.title"
                            @click='navigate'
                            variant='text'
                        )
                            v-icon {{item.icon}}
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
                    title: this.$vuetify.lang.t("$vuetify.settings"),
                    icon: "mdi-cog",
                    to: "/",
                },
                {
                    title: this.$vuetify.lang.t("$vuetify.dark_mode"),
                    icon: "mdi-moon-waning-crescent",
                    hasSwitch: true,
                    switch: true,
                },
                {
                    title: this.$vuetify.lang.t("$vuetify.logout"),
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
