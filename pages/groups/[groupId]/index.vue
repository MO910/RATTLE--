<template lang="pug">
v-container
    v-row.pt-10
        v-col.mb-5.col-lg-4.col-md-6.col-xs-12.col-sm-12(
            cols='12'
            v-for='folder in folders'
        )
            folder(:title='$vuetify.locale.t(folder.title)' :to='folder.to')
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
