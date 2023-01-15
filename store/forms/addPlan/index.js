import { defineStore } from "pinia";

export const useAddPlanStore = defineStore("addPlan", {
    state: () => ({
        types: ["new", "old", "tajweed", "tafseer", "custom"],
        colors: [
            "indigo",
            "deep-purple",
            "teal",
            "lime darken-3",
            "red",
            "orange",
            "blue-grey",
            "brown",
            "deep-orange",
        ],
        directions: ["descending", "Progressive"],
        // selected
        selectedColor: 1,
        selectedType: 0,
        selectedDirection: 0,
    }),
    actions: {},
});
