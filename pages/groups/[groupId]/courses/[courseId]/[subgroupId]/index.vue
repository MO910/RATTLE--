<template lang="pug">
v-container 
    date-picker-row
//- Plans
v-container 
    v-row.mt-10(v-if='plansOfDate.length')
        v-col.text-h4(cols='12')
            p.d-inline-block {{$vuetify.locale.t('$vuetify.plans')}}
            add-plan-form
        v-col.px-0.text-h4(
            md='4' sm='6' xs='12'
            v-for='plan in plansOfDate'
        )
            v-card.mx-5(v-if='!plan.hide' :color='plan.color')
                v-btn(icon='mdi-delete' variant="text")
                v-card-title.d-block.text-center {{$vuetify.locale.t(`$vuetify.${plan.title}`)}}
                v-card-text(
                    v-for='strings in getPlanString(plan, false)'
                    v-text='strings'
                )
//- Students of Subgroup
v-container(v-if='subgroup.students')
    v-row.mt-10
        v-col.text-h4(cols='12') {{$vuetify.locale.t('$vuetify.students')}}
    folder(
        :each='subgroup.students'
        :evalTitle='fullName'
    )
//- floating student plans
v-container(v-else)
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useQuranStore } from "~/store/quran";
// functions
import { stringify } from "~/static/js/stringify";
import { extractISODate } from "~/static/js/extractISODate";
// components
import datePickerRow from "~/components/forms/pieces/datePickerRow";
import addPlanForm from "~/components/forms/addPlanForm";

export default {
    components: { datePickerRow, addPlanForm },
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use stores data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return { ...storeToRefs(groupsStore), ...storeToRefs(quranStore) };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
        datePicker: {
            fetching: false,
            selectedDate: "2022-11-30",
        },
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
        // get the Subgroup
        subgroup() {
            const { subgroupId } = useRoute().params,
                sub = this.course.subgroups.find((s) => s.id == subgroupId),
                student =
                    sub ||
                    this.course.floatingStudents.find(
                        (s) => s.id == subgroupId
                    );
            this.isStudent = !sub;
            return student;
        },
        // get this day plans
        plansOfDate() {
            const plans = [...this.subgroup.plans];
            return plans
                .filter((plan) => !plan.hide)
                .map((plan) => {
                    let pClone = { ...plan };
                    pClone.day = plan.custom_plans?.filter(
                        (d) =>
                            extractISODate({ date: d.date }) ==
                            extractISODate({
                                date: this.datePicker.selectedDate,
                            })
                    );
                    return pClone;
                });
        },
    },
    methods: {
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
        // convert today plan to string
        getPlanString(plan, details = true) {
            let forToday = plan.day?.reduce((acc, curr) => {
                acc.push(
                    stringify({
                        courseTitle: this.course.title,
                        details,
                        versesPerPage: this.versesPerPage,
                        surahAdj: this.surahAdj,
                        $vuetify: this.$vuetify,
                        title: plan.title,
                        day: curr,
                    })
                );
                return acc;
            }, []);
            return forToday?.length
                ? forToday
                : [this.$vuetify.locale.t("$vuetify.nothingTodayMessage")];
        },
    },
};
</script>
