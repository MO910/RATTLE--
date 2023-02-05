// pinia
import { defineStore } from "pinia";
// states
import pages from "./states/pages";
import surahAdj from "./states/surahAdj";
import versesPerPage from "./states/versesPerPage";

export const useQuranStore = defineStore("quran", {
    state: () => ({ pages, surahAdj, versesPerPage }),
    getters: {
        surahsNames() {
            return this.surahAdj.chapters
                .map((s) => s.name_arabic)
                .reduce((acc, name, index) => {
                    return [...acc, { name, index }];
                }, []);
        },
    },
});
