<template lang="pug">
v-app
    navigation-drawer
    v-main
        v-container
            v-btn(v-if="!userId" nuxt to="/login") login
            //- v-breadcrumbs(:items="breadcrumbs")
                template(v-slot:divider)
                    v-icon mdi-chevron-{{$vuetify.rtl ? 'left' : 'right'}}
            slot
</template>

<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const authStore = useAuthStore();
        return { authStore, ...storeToRefs(authStore) };
    },
    data: () => ({}),
};
</script>
