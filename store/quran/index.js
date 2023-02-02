// pinia
import { defineStore } from "pinia";
import { useQuranStore } from "~/store/quran";
// states
import surahAdj from "./states/surahAdj";
import versesPerPage from "./states/versesPerPage";

export const useQuranStore = defineStore("quran", {
    state: () => ({
        surahAdj,
        versesPerPage,
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
});
