import { useAuthStore } from "~/store/auth";
export default async function () {
    // repair query
    const authStore = useAuthStore();
    const query = gql`
        query {
            groupsAsTeacher(id: "${authStore.userId}") {
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
            }
        }
    `;
    try {
        const {
            data: {
                value: { groupsAsTeacher },
            },
        } = await useAsyncQuery(query);
        this.groups = groupsAsTeacher;
    } catch (err) {
        console.log(err);
    }
}
