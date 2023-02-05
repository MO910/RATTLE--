<template lang="pug">
v-container
    v-row.mt-8
        v-col(cols='12')
            date-picker(
                :historyAction='groupsStore.groupAttendanceAtDate'
                :historyParams='historyParams'
            )
        v-col.px-6(cols='12')
            v-row
                v-col(cols='4') {{$vuetify.locale.t('$vuetify.student')}}
                v-col(cols='3') {{$vuetify.locale.t('$vuetify.attendance_status')}}
                v-col(cols='5') {{$vuetify.locale.t('$vuetify.note')}}
        v-col(cols='12' v-if='fetching') fetching!!
        v-col(cols='12' v-else)
            v-card.mb-8.px-6(v-for='student, si in selectedDateHistory')
                v-row
                    v-col(cols='4').d-flex.align-center {{student.first_name}}
                    v-col(cols='3').d-flex.align-center.justify-space-between
                        v-btn(
                            v-for='state, i in status'
                            @click='changeStatus(student, state.title, colorAt(si, i))'
                            :color="colorAt(si, i)"
                            variant="text" flat icon var
                        )
                            v-icon {{state.icon}}
                            v-tooltip(
                                activator="parent"
                                :color='state.color' 
                                location='bottom' open-delay='350'
                            ).text-capitalize {{$vuetify.locale.t(`$vuetify.${state.title}`)}}
                    v-col(cols='5').px-3.align-center
                        v-textarea(
                            name="note" rows="1" auto-grow
                            :model-value='student.attendance?.note'
                            variant="plain" clearable
                            @update:modelValue='changeNote(student, $event)'
                            :placeholder="$vuetify.locale.t(`$vuetify.typeYourNote`)"
                            :hint='noteStatus'
                        )

</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useDatesStore } from "~/store/forms/dates";
// components
import datePicker from "~/components/forms/pieces/datePicker";

export default {
    components: { datePicker },
    setup() {
        // fetch user
        // definePageMeta({ middleware: "fetch-user" });
        // use groups data
        const groupsStore = useGroupsStore();
        const datesStore = useDatesStore();
        let selectedDateHistory = ref([]);
        // watch the store and update
        groupsStore.$subscribe(() => {
            selectedDateHistory.value = groupsStore.attendanceHistory.filter(
                (history) => history.date.slice(0, 10) == datesStore.globalDate
            )?.[0]?.students;
        });
        // return the store
        return {
            groupsStore,
            ...storeToRefs(groupsStore),
            ...storeToRefs(datesStore),
            //
            selectedDateHistory,
        };
    },
    data: () => ({
        noteStatus: "",
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
        console.log(this.fetching);
    },
    computed: {
        historyParams() {
            const { groupId: group_id } = useRoute().params;
            return { group_id };
        },
    },
    methods: {
        // state
        stateAt(si) {
            const attendance_status =
                this.selectedDateHistory?.[si]?.attendance?.attendance_status;
            if (!attendance_status) return null;
            return this.status.map((s) => s.title).indexOf(attendance_status);
        },
        colorAt(si, i) {
            let state = this.stateAt(si);
            return state === i ? this.status[state]?.color : "";
        },
        async changeStatus(user, attendance_status, isActive) {
            // return;
            if (isActive) return;
            return await this.groupsStore.updateAttendance({
                user_id: user.id,
                attendance_status,
                date: this.globalDate,
            });
        },
        // debounce update
        debounce(cb, delay = 1000) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(cb, delay);
        },
        // note
        changeNote(user, note) {
            this.noteStatus = "saving...";
            // debounce algorithm to save request and speed up the experience
            this.debounce(async () => {
                await this.groupsStore.updateAttendance({
                    user_id: user.id,
                    note,
                    date: this.globalDate,
                });
                this.noteStatus = "saved";
            });
        },
    },
};
</script>
