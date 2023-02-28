// Dependencies
import stringify from "~/store/functions/stringify";
// Function
export default async function (args) {
    const tree = args.tree,
        targetArray = args.targetArray,
        rules = [...args.rules];
    args.rules = args.rules.map((rule) => rule.title);
    delete args.tree;
    delete args.targetArray;
    //  stringify
    const stringifyArgs = stringify(args);
    console.log(stringifyArgs);
    // GraphQl request
    const request = async () => {
        const mutation = gql`mutation { updateUser(${stringifyArgs}){ id }}`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    };
    await request();
    // add optimistic response to the new goal
    // const optimistic = new Optimistic({
    //     state: this,
    //     request,
    //     dataKey: "createUser",
    // });
    // optimistic.add({
    //     requestData: { ...args, rules },
    //     nodePath,
    // });
}
