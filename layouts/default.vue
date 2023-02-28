<template lang="pug">
NuxtLoadingIndicator
v-app
    navigation-drawer
    v-app-bar
        loading
        v-app-bar-nav-icon
        v-app-bar-title ايبش
        //- v-spacer
        v-btn(
            v-for="link in links"
            :to='link.to' nuxt
            variant='text'
            :active='isActive(link)'
        ) {{link.title}}
    v-main
        v-container
            v-btn(v-if="!loggedIn" nuxt to="/login") login
            //- v-breadcrumbs(:items="breadcrumbs")
                template(v-slot:divider)
                    v-icon mdi-chevron-{{$vuetify.rtl ? 'left' : 'right'}}
            v-overlay.datePickerOverlay(v-model="overlay" persistent :scrim='false')
            slot
</template>

<script>
import { useAuthStore } from "~/store/auth";
import { useDatesStore } from "~/store/forms/dates";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const authStore = useAuthStore();
        const datesStore = useDatesStore();
        return {
            authStore,
            ...storeToRefs(authStore),
            ...storeToRefs(datesStore),
        };
    },
    data: () => ({}),
    computed: {
        links() {
            return [
                {
                    icon: "mdi-account-multiple",
                    title: this.$vuetify.locale.t("$vuetify.groups"),
                    to: "/admin/groups",
                },
                {
                    icon: "mdi-home",
                    title: this.$vuetify.locale.t("$vuetify.competitions"),
                    to: "/admin/competitions",
                },
            ];
        },
    },
    methods: {
        isActive(link) {
            return link.to === "/admin/groups";
        },
    },
};
</script>

<style lang="sass">
@import "@/assets/variables"
@import "@/assets/general"
</style>
