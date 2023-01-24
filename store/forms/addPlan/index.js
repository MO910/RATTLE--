import { defineStore } from "pinia";
import { useQuranStore } from "~/store/quran";
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
    getters: {
        surahsNames() {
            const { surahAdj } = useQuranStore();
            return surahAdj.chapters
                .map((s) => s.name_arabic)
                .reduce((acc, name, index) => {
                    return [...acc, { name, index }];
                }, []);
        },
    },
    actions: { addPlan },
});
