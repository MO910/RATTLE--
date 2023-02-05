<template lang="pug">
v-app
    navigation-drawer
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
};
</script>

<style lang="sass">
@import "@/assets/variables"
@import "@/assets/general"
</style>
