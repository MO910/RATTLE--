<template lang="pug">
v-container
    v-row(v-if='floatingStudentsExists')
        v-col.text-h3(cols='12') الطلاب
        v-col(
            md='4' sm='6' xs='12'
            v-for='student in course.floatingStudents'
        )
            div(v-if='!student.hide') {{student.first_name}}
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
    mounted() {
        console.log(this.course);
    },
    computed: {
        courses() {
            const { groupId, courseId } = useRoute().params;
            return this.groups?.filter((g) => g.id == groupId)[0]?.courses;
        },
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
};
</script>
