// stores
import { useGroupsStore } from "~/store/groups";
// functions
import randomPassword from "~/store/functions/randomPassword";
import Optimistic from "~/store/functions/Optimistic";
import stringify from "~/store/functions/stringify";
// create user
export default async function (args) {
    console.log({ args });
    const tree = args.tree,
        targetArray = args.targetArray,
        rules = [...args.rules];
    // console.log({ args, tree });
    args.rules = args.rules.map((rule) => rule.title);
    delete args.tree;
    delete args.targetArray;
    //
    if (args.rules.includes("teacher")) {
        targetArray = "teacher";
    }
    // generate a random password if there is null passed
    args.password = args.password || randomPassword();
    //  stringify
    const stringifyArgs = stringify(args);
    // GraphQl request
    const request = async () => {
        const mutation = gql`mutation { createUser(${stringifyArgs}){ id }}`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    };
    // add optimistic response to the new goal
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        dataKey: "createUser",
    });
    await optimistic.add({
        requestData: { ...args, rules },
        tree,
        id: args.group_ids[0],
        targetArray,
    });
}
