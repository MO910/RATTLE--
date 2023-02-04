import { defineStore } from "pinia";
import editCustomPlan from "./actions/editCustomPlan";
// stores
import { useDatesStore } from "../forms/dates";
import { useInputNumberStore } from "../forms/inputNumber";
import { useSelectedVarsStore } from "../forms/selectedVars";

export const useCalendarStore = defineStore("calendar", {
    state: () => ({
        events: [],
        eventForm: {
            dialog: false,
            edit: false,
            data: {},
            form: {
                maxFrom: 1,
                maxTo: 1,
            },
        },
    }),
    actions: {
        editCustomPlan,
        resetEventForm() {
            // stores
            const inputNumberStore = useInputNumberStore();
            const selectedVarsStore = useSelectedVarsStore();
            const datesStore = useDatesStore();
            // from
            selectedVarsStore.fromSurahIndex = selectedVarsStore.toSurahIndex =
                null;
            this.eventForm.form.maxFrom = this.eventForm.form.maxTo = 1;
            inputNumberStore.fromAyah = inputNumberStore.toAyah = 1;
            // for all
            this.eventForm.data = {};
            this.eventForm.edit = true;
        },
    },
});
