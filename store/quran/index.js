import { defineStore } from "pinia";
import surahAdj from "./states/surahAdj";
import versesPerPage from "./states/versesPerPage";

export const useQuranStore = defineStore("quran", {
    state: () => ({
        surahAdj,
        versesPerPage,
    }),
});
