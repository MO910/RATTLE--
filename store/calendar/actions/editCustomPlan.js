// stores
import { useGroupsStore } from "~/store/groups";
// functions
import Optimistic from "~/store/functions/Optimistic";
import stringify from "~/store/functions/stringify";

export default async function (args) {
    const tree = args.tree;
    delete args.tree;
    console.log(args);
    const stringifyArgs = stringify(args);
    // prepare gql request
    const request = async () => {
        const mutation = gql`
            mutation {
                editCustomPlan(${stringifyArgs})
            }
        `;
        // mutate default client
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    };
    // add optimistic response to the new goal
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        stringifyArgs,
        dataKey: "editCustomPlan",
    });
    //
    if (args.newData) {
        await optimistic.update({
            id: args.custom_plan_id,
            requestData: args.newData,
            tree,
        });
    } else {
        await optimistic.remove({
            id: args.custom_plan_id,
            tree,
        });
    }
}
