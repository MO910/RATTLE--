import { defineStore } from "pinia";

export const useSelectedVarsStore = defineStore("selectedVars", {
    state: () => ({
        type: null,
        direction: null,
        color: null,
        surahIndex: null,
        days_selected: [0],
    }),
});
