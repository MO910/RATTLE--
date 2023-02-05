// Dependencies
import randomPassword from "~/store/functions/randomPassword";
import Optimistic from "~/store/functions/Optimistic";
import stringify from "~/store/functions/stringify";
// Function
export default async function (args) {
    const nodePath = args.nodePath,
        rules = [...args.rules];
    args.rules = args.rules.map((rule) => rule.title);
    delete args.nodePath;
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
        state: this,
        request,
        dataKey: "createUser",
    });
    optimistic.add({
        requestData: { ...args, rules },
        nodePath,
    });
}
