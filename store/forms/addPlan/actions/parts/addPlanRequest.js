export default async function (stringifyArgs) {
    const mutation = gql`
            mutation {
                addPlan(${stringifyArgs}) {
                    id
                    title
                    from
                    amount
                    weeks
                    rabt_amount
                    working_days
                    starting_at
                }
            }
        `;
    // mutate default client
    const { clients } = useApollo();
    return (await clients.default.mutate({ mutation })).data;
}
