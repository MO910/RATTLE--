<template lang="pug">
v-container
    custom-card(:each='controls' to='to')
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
// components
import customCard from "~/components/customCard";

export default {
    async setup() {
        // fetch user
        // fetch data middleware
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use stores data
        const groupsStore = useGroupsStore();
        return { ...storeToRefs(groupsStore) };
    },
    components: { customCard },
    data: () => ({
        controls: [
            { title: "centers", to: "entity?mode=centers" },
            { title: "groups" },
            { title: "courses" },
            { title: "users", to: "entity?mode=users" },
        ],
    }),
    mounted() {
        console.log(this.$route.query?.mode);
    },
};
</script>
