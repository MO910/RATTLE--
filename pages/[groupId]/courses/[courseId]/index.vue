<template lang="pug">
div
    //- Floating Students
    manage-group-btn
    v-container
        div(v-if='floatingStudentsExists')
            v-col.text-h3(cols='12') الطلاب
            custom-card(
                :each='course.floatingStudents'
                :evalTitle='fullName'
                :openContext="openStudentContext"
            )
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
            custom-card(
                :each='course.subgroups'
                chips='students'
                :evalChipsTitle='fullName'
                :openContext="openSubgroupContext"
            )
                template(#contextmenu)
                    contextmenu
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
import manageGroupBtn from "~/components/admin/manageGroupBtn";

export default {
    components: { contextmenu, confirmDialog, subgroupDialogs, manageGroupBtn },
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use store
        const groupsStore = useGroupsStore();
        const customCardStore = useCustomCardStore();
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
        openStudentContext() {
            this.contextMenu.type = "floating_student";
            this.contextMenu.subgroups = this.course.subgroups;
        },
        openSubgroupContext() {
            this.contextMenu.type = "subgroup";
        },
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
    },
};
</script>
