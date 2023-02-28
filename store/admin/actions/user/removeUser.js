// Dependencies
import stringify from "~/store/functions/stringify";
// Function
export default async function (id) {
    // GraphQl request
    const request = async () => {
        const mutation = gql`mutation { removeUser(id: "${id}")}`;
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
