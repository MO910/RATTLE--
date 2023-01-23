import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", {
    state: () => ({
        startingDate: null,
        globalDate: null,
    }),
});
