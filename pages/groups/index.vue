<template lang="pug">
v-container
    custom-card(:each='groups')
</template>

<script>
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useAuthStore } from "~/store/auth";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use groups data
        const groupsStore = useGroupsStore();
        const authStore = useAuthStore();
        // return the store
        return { ...storeToRefs(authStore), ...storeToRefs(groupsStore) };
    },
    computed: {},
};
</script>
