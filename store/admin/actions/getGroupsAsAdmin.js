import { useAuthStore } from "~/store/auth";
export default async function () {
    // repair query
    const authStore = useAuthStore();
    const query = gql`
        query {
            groupsAsAdmin(id: "${authStore.userId}") {
                id
                title
                working_days
                description
                courses {
                    id
                    title
                    floatingStudents {
                        id
                        gender
                        first_name
                        parent_name
                        email
                        phone
                        rules {
                            id
                            title
                        }
                    }
                    subgroups {
                        id
                        title
                        students {
                            id
                            gender
                            first_name
                            parent_name
                            email
                            phone
                            rules {
                                id
                                title
                            }
                        }
                        plans {
                            amount
                            color
                            from
                            id
                            title
                            starting_at
                            custom_plans {
                                from
                                date
                                id
                                note
                                to
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
                value: { groupsAsAdmin },
            },
        } = await useAsyncQuery(query);
        this.groupsAsAdmin = groupsAsAdmin;
    } catch (err) {
        console.log(err);
    }
}
