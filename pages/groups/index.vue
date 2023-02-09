<template lang="pug">
v-container
    custom-card(:each='groups')
</template>

<script>
import { useGroupsStore } from "~/store/groups";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use groups data
        const groupsStore = useGroupsStore();
        // return the store
        return { ...storeToRefs(groupsStore) };
    },
};
</script>
