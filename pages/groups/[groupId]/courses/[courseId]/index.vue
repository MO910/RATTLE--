<template lang="pug">
//- Floating Students
v-container
    div(v-if='floatingStudentsExists')
        v-col.text-h3(cols='12') الطلاب
        customCard(
            :each='course.floatingStudents'
            :evalTitle='fullName'
        )
//- Subgroups
v-container
    div(v-if='course.subgroups')
        v-col.text-h3(cols='12') المجموعات الفرعية
        customCard(
            :each='course.subgroups'
            chips='students'
            :evalChipsTitle='fullName'
        )
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
    computed: {
        group() {
            const { groupId } = useRoute().params;
            return this.groups?.find((g) => g.id == groupId);
        },
        course() {
            const { courseId } = useRoute().params;
            return this.group?.courses?.find((s) => s.id == courseId);
        },
        subgroups() {
            return this.course?.subgroups;
        },
        floatingStudentsExists() {
            return !!this.course?.floatingStudents?.length;
        },
    },
    methods: {
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
    },
};
</script>
