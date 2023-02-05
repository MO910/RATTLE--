import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
    state: () => ({
        fetching: false,
        // global
        globalDate: null,
        // history
        selectedDateHistory: [],
        attendanceHistory: [],
        // add plan
        newPlanStartingDate: null,
        // edit plan
        editEventDate: null,
    }),
});
