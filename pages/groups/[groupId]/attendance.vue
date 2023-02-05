<template lang="pug">
v-container
    v-row.mt-8
        v-col(cols='12')
            date-picker(
                :historyAction='groupsStore.getSubgroupHistoryAtDate'
                :historyParams='historyParams'
            )
        v-col(cols='12' v-if='!fetching')
            v-card.mb-8.px-6(v-for='student in selectedDateHistory') {{student}}

</template>

<script>
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useDatesStore } from "~/store/forms/dates";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use groups data
        const groupsStore = useGroupsStore();
        const datesStore = useDatesStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return { ...storeToRefs(groupsStore), ...storeToRefs(datesStore) };
    },
    data: () => ({
        status: [
            {
                title: "attended",
                icon: "mdi-check",
                color: "green",
            },
            {
                title: "absent",
                icon: "mdi-window-close",
                color: "error",
            },
            {
                title: "late",
                icon: "mdi-clock-time-nine",
                color: "lime darken-2",
            },
            {
                title: "excused",
                icon: "mdi-note",
                color: "yellow darken-4",
            },
        ],
    }),
    mounted() {
        console.log(this.selectedDateHistory);
    },
    computed: {
        selectedDateHistory() {
            return this.attendanceHistory.filter(
                (h) => h.date.slice(0, 10) == this.globalDate
            )?.[0]?.students;
        },
        historyParams() {
            const { groupId: group_id } = useRoute().params;
            return { group_id };
        },
    },
};
</script>
