import stringify from "~/store/functions/stringify";
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
    // graphQl req
    const { data: addRes } = await addPlanRequest(stringifyArgs);
    // graphQl spread req
    const spreadArgs = { plan_id: addRes.addPlan.id, custom_plans },
        stringifySpreadArgs = stringify(spreadArgs, true);
    const { data: spreadRes } = await spreadRequest(stringifySpreadArgs);
    return spreadRes;
}
