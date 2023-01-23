import { defineStore } from "pinia";

export const useInputNumberStore = defineStore("inputNumber", {
    state: () => ({
        ayahValue: 1,
        pagesValue: 1,
        weeks: 1,
    }),
});
