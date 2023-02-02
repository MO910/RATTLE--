import { defineStore } from "pinia";
// actions
import addPlan from "./actions/addPlan";

export const useAddPlanStore = defineStore("addPlan", {
    state: () => ({
        loading: false,
        dialog: false,
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
    }),
    actions: { addPlan },
});
