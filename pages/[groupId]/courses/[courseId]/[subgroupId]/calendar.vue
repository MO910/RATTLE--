<template lang="pug">
v-container
    group-heading-row
    custom-calendar(
        :updateEvents='updateEvents'
        :editEvent='editEvent'
        :groupWorkingDays='group.working_days'
    )
    //- edit events dialog
    edit-event-dialog(
        :isStudent='isStudent'
        :update='updateEvents'
        :subgroup='subgroup'
    )
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useCalendarStore } from "~/store/calendar";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { useDatesStore } from "~/store/forms/dates";
import { useQuranStore } from "~/store/quran";
// Functions
import { calendarEvents } from "~/static/js/calendarEvents";
import { stringify } from "~/static/js/stringify";
// components
import groupHeadingRow from "~/components/admin/group/groupHeadingRow";
import editEventDialog from "~/components/customCalendar/editEventDialog";

export default {
    components: { groupHeadingRow, editEventDialog },
    async setup() {
        // fetch user
        definePageMeta({
            middleware: ["fetch-user", "fetch-groups", "has-auth"],
        });
        // use groups data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        const calendarStore = useCalendarStore();
        const selectedVarsStore = useSelectedVarsStore();
        const inputNumberStore = useInputNumberStore();
        const datesStore = useDatesStore();
        // return the store
        return {
            ...storeToRefs(groupsStore),
            ...storeToRefs(quranStore),
            ...storeToRefs(calendarStore),
            ...storeToRefs(selectedVarsStore),
            ...storeToRefs(inputNumberStore),
            ...storeToRefs(datesStore),
        };
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
        subgroup_id() {
            return this.subgroup?.id;
        },
        // week days
        // groupWorkingDays() {
        //     return this.group.working_days;
        // },
        // weekDays() {
        //     let weekDays = JSON.parse(this.$vuetify.locale.locales.en.weekDays);
        //     return this.groupWorkingDays.map((di) => weekDays[di]);
        // },
    },
    methods: {
        updateEvents() {
            console.log({ subgroup: this.subgroup });
            this.events = calendarEvents({
                courseTitle: this.course.title,
                plans: this.subgroup.plans,
                custom_plans: this.subgroup.plans.map(
                    (plan) => plan.custom_plans
                ),
                weekDays: this.weekDays,
                versesPerPage: this.versesPerPage,
                surahAdj: this.surahAdj,
                $vuetify: this.$vuetify,
                stringify,
            });
            // this.updateModel(["calenderEvents", events]);
        },
        // event
        editEvent(event) {
            // get custom plan
            let custom_plans = this.subgroup.plans
                .map((plan) => plan.custom_plans)
                .flat();
            custom_plans = custom_plans.find((cp) => cp.id === event.id);
            // *update state
            let [fromSurahIndex, fromAyah] = custom_plans.from?.split(":"),
                [toSurahIndex, toAyah] = custom_plans.to?.split(":");
            console.log([fromSurahIndex, fromAyah], [toSurahIndex, toAyah]);
            // date
            this.editEventDate = new Date(event.start);
            // from
            this.fromSurahIndex = fromSurahIndex - 1;
            this.eventForm.form.maxFrom =
                this.surahAdj.chapters[fromSurahIndex - 1].verses_count;
            this.fromAyah = fromAyah;
            // to
            this.toSurahIndex = toSurahIndex - 1;
            this.eventForm.form.maxTo =
                this.surahAdj.chapters[toSurahIndex - 1].verses_count;
            this.toAyah = toAyah;
            // for all
            this.eventForm.data = custom_plans;
            this.eventForm.edit = true;
            this.eventForm.dialog = true;
        },
    },
};
</script>
