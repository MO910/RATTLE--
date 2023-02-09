<template lang="pug">
v-container
    custom-card(:each='folders' to='to' translate)
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
    data: () => ({
        folders: [
            {
                title: "$vuetify.subjects",
                icon: "mdi-bookshelf",
                color: "teal darken-1",
                title_color: "teal--text text--darken-4",
                to: "courses",
            },
            {
                title: "$vuetify.attend",
                icon: "mdi-calendar-range",
                color: "pink darken-2",
                title_color: "pink--text text--darken-4",
                to: "attendance",
            },
        ],
    }),
};
</script>
