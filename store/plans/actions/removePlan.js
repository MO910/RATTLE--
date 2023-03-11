import Optimistic from "~/store/functions/Optimistic";
import { useGroupsStore } from "~/store/groups";

export default async function ({ id, force, isStudent }) {
    const groupsStore = useGroupsStore(),
        tree = ["groups", "courses", "subgroups", "plans"];
    if (isStudent) tree[2] = "floatingStudents";
    // repair query
    async function request() {
        const mutation = gql`
            mutation {
                removePlan(
                    id: "${id}"
                    force: ${!!force}
                ) {
                    hasRemoved
                    customsRemainingId 
                }
            }
        `;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    }
    // Optimistic Response
    const optimistic = new Optimistic({
        state: groupsStore,
        request,
        dataKey: "removePlan",
    });
    // callback before actually removing the subgroup
    const callbackAfter = (findItemPath, element, response, i = 0) => {
        console.log({ findItemPath, element, response, i });
        if (!response[i]) return;
        if (!force && !response[i].hasRemoved) {
            const ids = response[i]?.customsRemainingId;
            let customsRemaining = element.custom_plans.filter((custom) =>
                ids.includes(custom.id)
            );
            // add back the customs that remaining
            eval(`groupsStore.${findItemPath}.custom_plans = customsRemaining`);
            // story the response
            this.removePlanResponse = response;
            // throw an error to stop the sequence
            throw "error";
        }
        // clear the response
        else if (i == 1) {
            const regexp = new RegExp(/\[(\d+)\]$/);
            let index = findItemPath.match(regexp);
            let list = findItemPath.replace(regexp, "");
            console.log({ list, index });
            eval(`groupsStore.${list}.splice(${+index[1]}, 1)`);
        }
    };
    // remove
    const [path, __, response] = await optimistic.remove({
        id,
        callbackAfter,
        tree,
    });
    console.log({ path, __, response });
    // remove rabt plan
    const allPlansList = eval(`groupsStore.${path}`);
    let rabtPlanIndex = allPlansList.reduce((acc, plan, i) => {
        if (!plan.hide && plan.rabt_for_plan_id === id) return i;
        return acc;
    }, null);
    try {
        callbackAfter(
            `${path}[${rabtPlanIndex}]`,
            allPlansList[rabtPlanIndex],
            response,
            1
        );
    } catch (err) {
        console.log(err);
    }
}
