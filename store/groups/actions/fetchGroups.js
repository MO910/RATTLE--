import { useAuthStore } from "~/store/auth";
function queryString(q, id) {
    return `${q}(id: "${id}") {
        id
        title
        working_days
        description
        courses {
            id
            title
            description
            floatingStudents {
                id
                first_name
                parent_name
                email
                phone
                gender
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
                plans_history {
                    custom_plan_id
                    amount_done
                    grade
                }
            }
            subgroups {
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
                        custom_plan_id
                        amount_done
                        grade
                    }
                }
            }
        }
    }`;
}
export default async function () {
    const authStore = useAuthStore();
    // repair query
    const query = gql`
        query {
            ${queryString("groupsAsAdmin", authStore.userId)}
            ${queryString("groupsAsTeacher", authStore.userId)}
            ${queryString("groupsAsParticipant", authStore.userId)}
        }`;
    try {
        const {
            data: {
                value: { groupsAsAdmin, groupsAsTeacher, groupsAsParticipant },
            },
        } = await useAsyncQuery(query);
        this.groupsAsAdmin = groupsAsAdmin;
        this.groupsAsTeacher = groupsAsTeacher;
        this.groupsAsParticipant = groupsAsParticipant;
    } catch (err) {
        console.log(err);
    }
}
