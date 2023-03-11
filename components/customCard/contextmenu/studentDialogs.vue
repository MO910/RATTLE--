<template lang="pug">
//- remove plan confirm dialog
confirm-dialog(type='remove' :action='removePlan' :closeCondition='isAllRemoved')
    v-row
        v-col(cols=12 v-if='!removePlanResponse')
            span {{$vuetify.locale.t('$vuetify.confirmRemoveMsg')}}
        v-col(cols=12 v-else-if='isAllRemoved')
            span {{$vuetify.locale.t('$vuetify.hasRemovedMsg')}}
        template(v-else)
            v-col(cols=12) {{$vuetify.locale.t('$vuetify.someCustomsRemainingMsg')}}
            v-col.px-10(cols=12)
                ul
                    li(v-for='custom in mapCustoms')
                        | {{custom}}
            v-col(cols=12) {{$vuetify.locale.t('$vuetify.confirmForceRemoveMsg')}}
    //- template
//- transport student confirm dialog
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
import { usePlansStore } from "~/store/plans";
// Functions
import { stringify } from "~/static/js/stringify";
// Components
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";
import addSubgroupDialog from "~/components/forms/addSubgroupDialog";

export default {
    props: ["plans", "isStudent"],
    setup() {
        // use groups data
        const groupsStore = useGroupsStore();
        const customCardStore = useCustomCardStore();
        const plansStore = usePlansStore();
        // return the store
        return {
            groupsStore,
            plansStore,
            ...storeToRefs(groupsStore),
            ...storeToRefs(plansStore),
            ...storeToRefs(customCardStore),
        };
    },
    components: { confirmDialog, addSubgroupDialog },
    data: () => ({
        selectedSubgroupId: null,
    }),
    computed: {
        mapCustoms() {
            let ids = this.removePlanResponse;
            ids = ids?.map((res) => res?.customsRemainingId)?.flat();
            if (!ids) return [];
            const customs = this.plans.map((plan) => plan.custom_plans).flat();
            let intersect = customs.filter((custom) => ids.includes(custom.id));
            intersect = intersect.slice(0, 3);
            return intersect.map((custom) =>
                stringify({
                    day: custom,
                    courseTitle: "quran",
                    versesPerPage: this.versesPerPage,
                    surahAdj: this.surahAdj,
                    $vuetify: this.$vuetify,
                })
            );
        },
        isAllRemoved() {
            return this.removePlanResponse
                ?.map((res) => res.hasRemoved)
                ?.every((removed) => removed);
        },
        // close
        closeCondition() {
            return this.isAllRemoved;
        },
    },
    methods: {
        select(selected) {
            this.selectedSubgroupId = selected[0];
        },
        // remove plan
        async removePlan() {
            await this.plansStore.removePlan({
                id: this.contextMenu.entity.id,
                force: !!this.removePlanResponse,
                isStudent: this.isStudent,
            });
        },
        async transportAction() {
            const { courseId: course_id } = this.$route.params;
            // do action
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
        },
    },
};
</script>
