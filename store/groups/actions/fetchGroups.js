import { useAuthStore } from "~/store/auth";
import groupQuery from "~/store/functions/groupQuery";

// function
export default async function () {
    const authStore = useAuthStore();
    // repair query
    const args = { id: authStore.userId };
    const query = gql`
        query {
            ${groupQuery("groupsAsAdmin", args)}
            ${groupQuery("groupsAsTeacher", args)}
            ${groupQuery("groupsAsParticipant", args)}
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
