import { useAuthStore } from "~/store/auth";
export default async function () {
    const authStore = useAuthStore();
    console.log({ userId: authStore.userId });
    // repair query
    const query = gql`
        query {
            organization(userId: "${authStore.userId}") {
                id
                title
                centers {
                    id
                    title
                    working_days
                    admin_ids
                    description
                    groups {
                        id
                        title
                    }
                }
            }
        }`;
    try {
        const {
            data: {
                value: { organization },
            },
        } = await useAsyncQuery(query);
        this.organization = organization;
    } catch (err) {
        console.log(err);
    }
}
