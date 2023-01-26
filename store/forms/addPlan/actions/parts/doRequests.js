import stringify from "~/store/functions/stringify";
import Optimistic from "~/store/functions/Optimistic";
import { useGroupsStore } from "~/store/groups";
// requests
import addPlanRequest from "./addPlanRequest";
import spreadRequest from "./spreadRequest";
// functions
export default async function (plan) {
    // stringify the args after deleting some keys
    const tree = plan.tree,
        custom_plans = plan.days;
    delete plan.days;
    delete plan.tree;
    const stringifyArgs = stringify(plan);
    // *add optimistic response to the new goal
    const addPlanOptimistic = new Optimistic({
        state: useGroupsStore(),
        request: addPlanRequest,
        stringifyArgs,
        dataKey: "addPlan",
    });
    const newPlan = await addPlanOptimistic.add({
        id: plan.subgroup_id,
        requestData: { custom_plans: [], ...plan },
        tree,
        targetArray: "plans",
    });
    console.log(newPlan);
    // prepare spread args
    const spreadArgs = { plan_id: newPlan.id, custom_plans },
        stringifySpreadArgs = stringify(spreadArgs, true);
    // *add optimistic response to the new custom plans
    const spreadOptimistic = new Optimistic({
        state: useGroupsStore(),
        request: spreadRequest,
        stringifyArgs: stringifySpreadArgs,
        dataKey: "spreadPlan",
    });
    const customs = await spreadOptimistic.add({
        id: newPlan.id,
        requestData: custom_plans,
        tree: [...tree, "plans"],
        targetArray: "custom_plans",
    });
}
