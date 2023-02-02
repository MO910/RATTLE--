<template lang="pug">
v-container
    custom-calendar(:updateEvents='updateEvents')
    //- edit events dialog
    edit-event-dialog(
        :isStudent='isStudent'
        :update='updateEvents'
    )
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useCalendarStore } from "~/store/calendar";
import { useQuranStore } from "~/store/quran";
// Functions
import { calendarEvents } from "~/static/js/calendarEvents";
import { stringify } from "~/static/js/stringify";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use groups data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        const calendarStore = useCalendarStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return {
            ...storeToRefs(groupsStore),
            ...storeToRefs(quranStore),
            ...storeToRefs(calendarStore),
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
        // week days
        groupWorkingDays() {
            return this.group.working_days;
        },
        weekDays() {
            // let weekDays = JSON.parse(this.$vuetify.lang.locales.en.weekDays);
            // return this.groupWorkingDays.map((di) => weekDays[di]);
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDays"));
        },
    },
    methods: {
        updateEvents() {
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
    },
};
</script>
