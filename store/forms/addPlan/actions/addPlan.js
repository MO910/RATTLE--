// parts
import preparePlansData from "./parts/preparePlansData";
import doRequests from "./parts/doRequests";

// export
export default async function (args) {
    let { plans, inputPlanData } = preparePlansData(args);
    // add
    try {
        let mainPlan;
        for (let plan of plans)
            mainPlan = await doRequests({
                ...plan,
                rabt_for_plan_id: mainPlan?.id,
            });
    } catch (err) {
        console.log(err);
    }
}
