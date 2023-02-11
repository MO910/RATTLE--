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
                    courses {
                        id
                        title
                        subgroups{
                            id
                            title
                        }
                    }
                }
                groupsAsAdmin {
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
