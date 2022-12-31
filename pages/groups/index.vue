<template lang="pug">
v-container
    v-row.pt-10
        v-col.mb-5.col-lg-4.col-md-6.col-xs-12.col-sm-12(
            cols='12'
            v-for='group in groups'
        )
            folder(:title='group.title' :to='group.id')
</template>

<script>
import { useGroupsStore } from "~/store/groups";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use groups data
        const groupsStore = useGroupsStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return { ...storeToRefs(groupsStore) };
    },
    methods: {
        groupRouter(groupId) {
            return `/groups/${groupId}`;
        },
    },
};
</script>
