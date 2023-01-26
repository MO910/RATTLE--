export default async function (stringifySpreadArgs) {
    const mutation = gql`
        mutation {
            spreadPlan(${stringifySpreadArgs}) {
                id
                date
                from
                to
                note
            }
        }
    `;
    // mutate default client
    const { clients } = useApollo();
    return (await clients.default.mutate({ mutation })).data;
}
