<template lang="pug">
add-subgroup-dialog
confirm-dialog(type='edit') edit form
confirm-dialog(type='remove' :action='removeAction') confirm remove
confirm-dialog(type='transport' :action='transportAction') 
    v-list(
        @update:selected='select'
        :items='contextMenu.subgroups'
        item-title="title"
        item-value="id"
        active-color="blue"
    )
</template>
<script>
// Stores
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";
import { useGroupsStore } from "~/store/groups";
// Components
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";
import addSubgroupDialog from "~/components/forms/addSubgroupDialog";

export default {
    props: ["type", "action"],
    setup() {
        // use groups data
        const groupsStore = useGroupsStore();
        const customCardStore = useCustomCardStore();
        // return the store
        return {
            groupsStore,
            ...storeToRefs(groupsStore),
            ...storeToRefs(customCardStore),
        };
    },
    components: { confirmDialog, addSubgroupDialog },
    data: () => ({
        selectedSubgroupId: null,
    }),
    methods: {
        select(selected) {
            this.selectedSubgroupId = selected[0];
        },
        // actions
        async removeAction() {
            const { courseId: course_id } = this.$route.params;
            // console.log("contextmenu", this);
            await this.doAction(async () => {
                await this.groupsStore.removeSubgroup({
                    id: this.contextMenu.entity.id,
                    course_id,
                });
            });
        },
        async transportAction() {
            const { courseId: course_id } = this.$route.params;
            // console.log("contextmenu", this);
            await this.doAction(async () => {
                const student_id = this.contextMenu.entity.id,
                    subgroup_id = this.selectedSubgroupId,
                    // floating
                    isFloating = this.contextMenu.type.includes("float");
                // do action
                await this.groupsStore.transportToSubgroup({
                    student_id,
                    subgroup_id,
                    course_id,
                    // guid ones
                    isFloating,
                });
            });
        },
        async doAction(callBack) {
            // this.confirmDialogLoading = true;
            // do action
            await callBack();
            // stop loading and close dialog
            // this.confirmDialogLoading = false;
            // this.contextMenu.dialog.show = false;
        },
    },
};
</script>
