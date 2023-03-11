<template lang="pug">
div
    group-heading-row
    //- Plans
    v-container
        v-row
            v-col.text-h3 {{title}}
            v-col.d-flex.justify-end
                date-picker(
                    :historyAction='groupsStore.getSubgroupHistoryAtDate'
                    :historyParams='historyParams'
                    btnStyle='fullHeight'
                )
        v-row.mt-10
            v-col(cols='12')
                NuxtLink(:to='calendarRouter')
                    v-btn(
                        color='blue lighten-2'
                        variant='outlined' block
                        size='x-large'
                    )
                        v-icon.mx-5 mdi-calendar-today
                        | {{$vuetify.locale.t('$vuetify.showCalendar')}}
            v-col.text-h4(cols='12')
                p.d-inline-block {{$vuetify.locale.t('$vuetify.plans')}}
                add-plan-form(
                    :default_days='groupWorkingDays'
                    :group='group'
                    :subgroup_id='subgroup?.id'
                    :isStudent='isStudent'
                )
        //- plans
        custom-card(
            v-if='plansOfDate.length'
            :each='plansOfDate'
            :translate='true'
            titleStyling='d-block text-center'
            :openContext="openPlanContext"
            v-slot="props"
        )
            div(
                v-for='strings in getPlanString(props.entity, false)'
                v-text='strings'
            )
        //- v-col.px-0.text-h4(
        //-     v-if='plansOfDate.length'
        //-     v-for='plan in plansOfDate'
        //-     md='4' sm='6' xs='12'
        //- )
            v-card.mx-5(v-if='!plan.hide' :color='plan.color')
                v-btn(icon='mdi-delete' variant="text")
                v-card-title.d-block.text-center {{$vuetify.locale.t(`$vuetify.${plan.title}`)}}
                v-card-text(
                    v-for='strings in getPlanString(plan, false)'
                    v-text='strings'
                )
        v-col(v-else) {{$vuetify.locale.t(`$vuetify.noPlansMsg`)}}
    //- Students of Subgroup
    v-container(v-if='!isStudent')
        v-row.mt-10
            v-col.text-h4(cols='12') {{$vuetify.locale.t('$vuetify.students')}}
        custom-card(
            :each='subgroup.students'
            :evalTitle='fullName'
            v-slot="{ entity: student }"
            :openContext="openStudentContext"
            :link='false' lg=6
        )
            advantage(
                v-for='plan in eachDay'
                :plan='plan'
                :student_id='student.id'
            )
    //- floating student plans
    v-container(v-else-if='eachDay.length') 
        v-row.mt-10
            v-col.text-h4(cols=12) {{$vuetify.locale.t('$vuetify.advantage')}}
            v-col(cols=12)
                v-card.px-5.py-8
                    advantage(
                        v-for='plan in eachDay'
                        :plan='plan'
                        :student_id='subgroup.id'
                    )
    //- confirm message dialog
    student-dialogs(:plans="subgroup.plans" :isStudent="isStudent")
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useQuranStore } from "~/store/quran";
import { useDatesStore } from "~/store/forms/dates";
import { useCustomCardStore } from "~/store/customCard";
// functions
import { stringify } from "~/static/js/stringify";
import { extractISODate } from "~/static/js/extractISODate";
// components
import advantage from "~/components/customCard/advantage";
import datePicker from "~/components/forms/pieces/datePicker";
import addPlanForm from "~/components/forms/addPlanForm";
import contextmenu from "~/components/customCard/contextmenu";
import studentDialogs from "~/components/customCard/contextmenu/studentDialogs";
import groupHeadingRow from "~/components/admin/group/groupHeadingRow";

export default {
    components: {
        advantage,
        datePicker,
        addPlanForm,
        contextmenu,
        studentDialogs,
        groupHeadingRow,
    },
    async setup() {
        // fetch user
        definePageMeta({
            middleware: ["fetch-user", "fetch-groups", "has-auth"],
        });
        // use stores data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        const datesStore = useDatesStore();
        const customCardStore = useCustomCardStore();
        return {
            groupsStore,
            ...storeToRefs(customCardStore),
            ...storeToRefs(groupsStore),
            ...storeToRefs(quranStore),
            ...storeToRefs(datesStore),
        };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
    }),
    mounted() {
        console.log({ subgroup: this.subgroup });
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
        // page title
        title() {
            return this.isStudent
                ? this.fullName(this.subgroup)
                : this.subgroup.title;
        },
        // get this day plans
        plansOfDate() {
            const plans = [...(this.subgroup?.plans || [])];
            return plans
                .filter((plan) => !plan.hide)
                .map((plan) => {
                    let pClone = { ...plan };
                    pClone.day = plan.custom_plans?.filter((day) => {
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
        // rout to calendar
        calendarRouter() {
            const fullPath = useRoute().fullPath;
            return `${fullPath.replace(/\/$/, "")}/calendar`;
        },
        // get allowed dates in calender (avoiding not working days)
        disabledWeekDays() {
            // !disabled
            return this.groupWorkingDays;
        },
    },
    methods: {
        // context
        openStudentContext() {
            this.contextMenu.type = "student";
            this.contextMenu.subgroups = this.course.subgroups;
        },
        openPlanContext() {
            this.contextMenu.type = "plan";
        },
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
        // debounce update
        debounce(cb, delay = 1000) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(cb, delay);
        },
        modelValue(e) {
            this.debounce(() => {
                console.log("modelValue", e);
            });
        },
    },
};
</script>
