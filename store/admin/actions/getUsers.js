// import { useAuthStore } from "~/store/auth";
export default async function () {
    // const organization_id = this.organization?.id;
    const organization_id = "6336d66da99d2cb48dab4446";
    // repair query
    const query = gql`
        query {
            user(organization_id: "${organization_id}") {
                id
                organization_id
                first_name
                email
                phone
                rules {
                    title
                    permissions
                }
                groups {
                    id
                    title
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
        this.users = user;
    } catch (err) {
        console.log(err);
    }
}
