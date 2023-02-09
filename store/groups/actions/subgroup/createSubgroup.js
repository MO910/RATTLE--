import { useGroupsStore } from "~/store/groups";
import Optimistic from "~/store/functions/Optimistic";
import stringify from "~/store/functions/stringify";

export default async function (args) {
    const stringifyArgs = stringify(args);
    // repair query
    async function request() {
        const mutation = gql`
            mutation {
                createSubgroup(${stringifyArgs}){
                    id
                    title
                    plans {
                        id
                        title
                        color
                        order_reversed
                        from
                        amount
                        weeks
                        rabt_amount
                        working_days
                        starting_at
                        custom_plans {
                            id
                            from
                            to
                            date
                        }
                    }
                    students {
                        id
                        first_name
                        parent_name
                        email
                        phone
                        gender
                        plans_history {
                            amount_done
                        }
                    }
                }
            }
        `;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    }
    // Optimistic Response
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        dataKey: "createSubgroup",
    });
    // add
    await optimistic.add({
        id: args.course_id,
        requestData: { students: [], plans: [], ...args },
        tree: ["groups", "courses"],
        targetArray: "subgroups",
    });
}
