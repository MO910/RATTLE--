<template lang="pug">
//- v-container 
date-picker(
    :historyAction='groupsStore.getSubgroupHistoryAtDate'
    :historyParams='historyParams'
    :allowedDates='allowedDates'
)
//- Plans
v-container 
    v-row.mt-10()
        v-col.text-h4(cols='12')
            p.d-inline-block {{$vuetify.locale.t('$vuetify.plans')}}
            add-plan-form(
                :default_days='groupWorkingDays'
                :group='group'
                :subgroup_id='subgroup.id'
                :isStudent='isStudent'
            )
        v-col.px-0.text-h4(
            v-if='plansOfDate.length'
            v-for='plan in plansOfDate'
            md='4' sm='6' xs='12'
        )
            v-card.mx-5(v-if='!plan.hide' :color='plan.color')
                v-btn(icon='mdi-delete' variant="text")
                v-card-title.d-block.text-center {{$vuetify.locale.t(`$vuetify.${plan.title}`)}}
                v-card-text(
                    v-for='strings in getPlanString(plan, false)'
                    v-text='strings'
                )
        v-col(v-else) {{$vuetify.locale.t(`$vuetify.noPlansMsg`)}}
//- Students of Subgroup
v-container(v-if='subgroup.students')
    v-row.mt-10
        v-col.text-h4(cols='12') {{$vuetify.locale.t('$vuetify.students')}}
    customCard(
        :each='subgroup.students'
        :evalTitle='fullName'
        v-slot="slotProps"
        lg=6
        :link='false'
    )
        advantage(
            v-for='plan in eachDay'
            :plan='plan'
            :student_id='slotProps.student_id'
        )
//- floating student plans
v-container(v-else)
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useQuranStore } from "~/store/quran";
import { useDatesStore } from "~/store/forms/dates";
// functions
import { stringify } from "~/static/js/stringify";
import { extractISODate } from "~/static/js/extractISODate";
// components
import advantage from "~/components/customCard/advantage";
import datePicker from "~/components/forms/pieces/datePicker";
import addPlanForm from "~/components/forms/addPlanForm";

export default {
    components: { advantage, datePicker, addPlanForm },
    async setup() {
        // useHead({ script: [{ src: "/js/inputNumber.js" }] });
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use stores data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        const datesStore = useDatesStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return {
            groupsStore,
            ...storeToRefs(groupsStore),
            ...storeToRefs(quranStore),
            ...storeToRefs(datesStore),
        };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
        datePicker: {
            fetching: false,
            selectedDate: "2023-01-22",
        },
    }),
    mounted() {
        console.log(this.plansOfDate);

        console.log(
            extractISODate({
                date: this.datePicker.selectedDate,
            })
        );
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
                    pClone.day = plan.custom_plans?.filter((day) => {
                        // console.log(
                        //     extractISODate({ date: day.date }),
                        //     extractISODate({
                        //         date: this.datePicker.selectedDate,
                        //     })
                        // );
                        return (
                            extractISODate({ date: day.date }) ==
                            extractISODate({
                                date: this.globalDate,
                            })
                        );
                    });
                    return pClone;
                });
        },
        groupWorkingDays() {
            return this.group?.working_days;
        },
        // each day advantage
        eachDay() {
            // let advantage = this.advantage.map((plan) => plan.day);
            return (
                this.plansOfDate?.reduce((acc, plan) => {
                    plan.day?.forEach((day) => {
                        acc.push({
                            ...plan,
                            day,
                        });
                    });
                    return acc;
                }, []) || []
            );
        },
        // for date picker
        historyParams() {
            return { subgroup_id: this.subgroup?.id };
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
        // get allowed dates in calender (avoiding not working days)
        allowedDates(val) {
            const weekDay = new Date(val).getDay();
            return weekDay in this.groupWorkingDays;
        },
    },
};
</script>
