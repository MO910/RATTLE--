import { defineStore } from "pinia";

export const useSelectedVarsStore = defineStore("selectedVars", {
    state: () => ({
        type: 0,
        direction: 0,
        color: null,
        surahIndex: 0,
        has_rabt: false,
        days_selected: [0],
        add_group_days_selected: [0],
        // events
        fromSurahIndex: null,
        toSurahIndex: null,
        toPlanIndex: null,
    }),
});
