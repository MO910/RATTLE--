import { defineStore } from "pinia";
import editCustomPlan from "./actions/editCustomPlan";

export const useCalendarStore = defineStore("calendar", {
    state: () => ({
        events: [],
        eventForm: {
            dialog: false,
            edit: false,
            data: {},
            form: {
                date: "",

                fromSurahIndex: null,
                maxFrom: 1,
                fromAyah: 1,

                toSurahIndex: null,
                maxTo: 1,
                toAyah: 1,
            },
        },
    }),
    actions: { editCustomPlan },
});
