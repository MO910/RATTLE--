// stores
import { useAddPlanStore } from "~/store/forms/addPlan";
// parts
import preparePlansData from "./parts/preparePlansData";
import doRequests from "./parts/doRequests";

// export
export default async function (args) {
    useAddPlanStore().loading = true;
    //
    let { plans, inputPlanData } = preparePlansData(args);
    // add
    let mainPlan;
    for (let plan of plans)
        mainPlan = await doRequests({
            ...plan,
            rabt_for_plan_id: mainPlan?.id,
        });
    // close and stop loading
    useAddPlanStore().loading = false;
    useAddPlanStore().dialog = false;
}
