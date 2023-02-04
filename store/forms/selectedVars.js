import { defineStore } from "pinia";

export const useSelectedVarsStore = defineStore("selectedVars", {
    state: () => ({
        type: null,
        direction: null,
        color: null,
        surahIndex: 0,
        has_rabt: false,
        days_selected: [0],
        // events
        fromSurahIndex: null,
        toSurahIndex: null,
        toPlanIndex: null,
    }),
});
