<template lang="pug">
v-btn(
    v-if='authorizationForCurrentGroup?.includes("admin")'
    :to='manageRout' nuxt
) manage group
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default {
    async setup() {
        // use groups data
        const authStore = useAuthStore();
        // return the store
        return { ...storeToRefs(authStore) };
    },
    computed: {
        manageRout() {
            const { groupId } = useRoute().params;
            return `/admin/groups/${groupId}`;
        },
    },
};
</script>
