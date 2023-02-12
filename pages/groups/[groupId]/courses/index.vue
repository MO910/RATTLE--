<template lang="pug">
v-container
    .text-h3 {{$vuetify.locale.t('$vuetify.subjects')}}
    custom-card(:each='courses')
</template>

<script>
import { useGroupsStore } from "~/store/groups";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user"] });
        // use groups data
        const groupsStore = useGroupsStore();
        // return the store
        return { ...storeToRefs(groupsStore) };
    },
    computed: {
        courses() {
            const { groupId } = useRoute().params;
            return this.groups?.filter((g) => g.id == groupId)[0]?.courses;
        },
    },
};
</script>
