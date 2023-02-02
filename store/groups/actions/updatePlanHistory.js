import stringify from "~/store/functions/stringify";

export default async function (args) {
    const stringifyArgs = stringify(args);
    // repair query
    const mutation = gql`
        mutation {
            updatePlanHistory(${stringifyArgs})
        }
    `;
    try {
        const { clients } = useApollo();
        const { data } = await clients.default.mutate({ mutation });
    } catch (err) {
        console.log(err);
    }
}
