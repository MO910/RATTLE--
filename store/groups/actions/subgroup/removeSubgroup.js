import Optimistic from "~/store/functions/optimistic";
import { useGroupsStore } from "~/store/groups";

export default async function ({ id, course_id }) {
    // repair query
    async function request() {
        const mutation = gql`
            mutation {
                removeSubgroup(id: "${id}"){
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
        dataKey: "removeSubgroup",
    });
    // callback before actually removing the subgroup
    const callbackBefore = async (element) => {
        await Promise.all(
            element.students?.map(async (student) => {
                await this.transportToSubgroup({
                    student_id: student.id,
                    course_id,
                });
            })
        );
    };
    // remove
    await optimistic.remove({
        id,
        tree: ["groups", "courses", "subgroups"],
        callbackBefore,
    });
}
