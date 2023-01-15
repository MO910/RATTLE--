import { defineStore } from "pinia";

export const useBtnToggleStore = defineStore("btnToggle", {
    state: () => ({
        selectedType: null,
        selectedDirection: null,
    }),
    actions: {},
});
