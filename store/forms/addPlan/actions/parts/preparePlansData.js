import { generatePlanDays } from "~/static/js/generatePlanDays";
// stores
import { useAddPlanStore } from "~/store/forms/addPlan";
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { useDatesStore } from "~/store/forms/dates";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useQuranStore } from "~/store/quran";

export default function ({ group, subgroup_id, isStudent }) {
    // inputted data
    let inputPlanData = {
        subgroup_id,
        title: useAddPlanStore().types[useSelectedVarsStore().type],
        order_reversed: !!useSelectedVarsStore().direction,
        from: +useSelectedVarsStore().surahIndex + 1,
        amount: +useInputNumberStore().pagesValue,
        weeks: +useInputNumberStore().weeks,
        rabt_amount: useSelectedVarsStore().has_rabt
            ? +useInputNumberStore().rabtPagesValue
            : undefined,
        working_days: useSelectedVarsStore().days_selected,
        starting_at: new Date(useDatesStore().startingDate),
        tree: isStudent
            ? ["groups", "courses", "floatingStudents"]
            : ["groups", "courses", "subgroups"],
        color: useSelectedVarsStore().color,
    };
    // spread customs
    let plans = generatePlanDays(
        group,
        inputPlanData,
        useQuranStore().versesPerPage
    );
    // return
    return { plans, inputPlanData };
}
