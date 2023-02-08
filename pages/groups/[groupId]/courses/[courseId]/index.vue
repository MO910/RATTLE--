<template lang="pug">
//- Floating Students
v-container
    div(v-if='floatingStudentsExists')
        v-col.text-h3(cols='12') الطلاب
        customCard(
            :each='course.floatingStudents'
            :evalTitle='fullName'
            :openContext="openStudentContext"
        )
            template(#contextmenu)
                contextmenu(:ele='course.subgroups.id')
//- Subgroups
v-container
    div(v-if='course.subgroups')
        v-col.text-h3(cols='12') المجموعات الفرعية
        v-btn.mx-5(
            @click='addSubgroupDialog = true'
            color='success' icon 
            variant='outlined'
        )
            v-icon mdi-plus
        customCard(
            :each='course.subgroups'
            chips='students'
            :evalChipsTitle='fullName'
            :openContext="openSubgroupContext"
        )
            template(#contextmenu)
                contextmenu(:ele='course.subgroups.id')
//- confirm message dialog
subgroup-dialogs
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useCustomCardStore } from "~/store/customCard";
// components
import contextmenu from "~/components/customCard/contextmenu";
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";
import subgroupDialogs from "~/components/customCard/contextmenu/subgroupDialogs";

export default {
    components: { contextmenu, confirmDialog, subgroupDialogs },
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use store
        const groupsStore = useGroupsStore();
        const customCardStore = useCustomCardStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return {
            groupsStore,
            ...storeToRefs(groupsStore),
            ...storeToRefs(customCardStore),
        };
    },
    data: () => ({
        selectedSubgroupId: null,
    }),
    computed: {
        group() {
            const { groupId } = useRoute().params;
            return this.groups?.find((g) => g.id == groupId);
        },
        course() {
            const { courseId } = useRoute().params;
            return this.group?.courses?.find((s) => s.id == courseId);
        },
        // subgroups() {
        //     return this.course?.subgroups;
        // },
        floatingStudentsExists() {
            return !!this.course?.floatingStudents?.length;
        },
    },
    methods: {
        // context
        openContext(e, entity) {
            this.contextMenu.entity = entity;
            // reposition
            $(".contextMenu").css({
                top: e.clientY + "" + "px",
                left: e.clientX + "px",
            });
            // open
            this.contextMenu.show = false;
            this.$nextTick(() => {
                this.contextMenu.show = true;
            });
        },
        openStudentContext(e, entity) {
            this.contextMenu.type = "floating_student";
            this.contextMenu.subgroups = this.course.subgroups;
            this.openContext(e, entity);
        },
        openSubgroupContext(e, entity) {
            this.contextMenu.type = "subgroup";
            this.openContext(e, entity);
        },
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
    },
};
</script>
