import stringify from "./stringify";

export default function (query, args) {
    const stringifyArgs = stringify(args);
    return `${query}(${stringifyArgs}) {
        id
        title
        working_days
        description
        teacher {
            id
            first_name
            parent_name
            email
            phone
            gender
        }
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
                rules {
                    id
                    title
                    permissions
                }
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
                    rules {
                        id
                        title
                        permissions
                    }
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
