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
            :openContext='openContext'
        )
            template(#contextmenu)
                subgroup-contextmenu(:ele='course.subgroups.id')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useCustomCardStore } from "~/store/customCard";
// components
import subgroupContextmenu from "~/components/customCard/contextmenu/subgroup";

export default {
    components: { subgroupContextmenu },
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use store
        const groupsStore = useGroupsStore();
        const customCardStore = useCustomCardStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return { ...storeToRefs(groupsStore), ...storeToRefs(customCardStore) };
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
        openContext(e) {
            // reposition
            $(".subgroupContextMenu").css({
                top: e.clientY + "" + "px",
                left: e.clientX + "px",
            });
            // open
            this.subgroupContextMenu.show = false;
            // this.subgroupContextMenu.x = e.clientX;
            // this.subgroupContextMenu.y = e.clientY;
            // this.updateModel(["contextmenu.entity", this.entity]);
            // this.updateModel(["contextmenu.subgroups", this.subgroups]);
            // this.updateModel(["contextmenu.type", this.type]);
            this.$nextTick(() => {
                this.subgroupContextMenu.show = true;
            });
        },
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
    },
};
</script>
