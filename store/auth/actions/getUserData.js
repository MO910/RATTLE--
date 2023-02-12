export default async function () {
    const query = gql`
        query {
            user(id: "${this.userId}") {
                id
                organization_id
                first_name
                parent_name
                email
                phone
                gender
                rules {
                    id
                    title
                    permissions
                }
                groupsAsTeacher {
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
                groupsAsAdmin {
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
                groupsAsParticipant {
                    id
                    title
                    working_days
                    courses {
                        id
                        title
                        subgroups{
                            id
                            title
                        }
                    }
                }
                subgroups {
                    id
                    title
                }
            }
        }
    `;
    try {
        const {
            data: {
                value: { user },
            },
        } = await useAsyncQuery(query);
        this.user = user[0];
        this.loggedIn = true;
    } catch (err) {
        console.log(err);
    }
}
