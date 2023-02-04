import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
    state: () => ({
        // global
        globalDate: null,
        selectedDateHistory: [],
        // add plan
        newPlanStartingDate: null,
        // edit plan
        editEventDate: null,
    }),
});
