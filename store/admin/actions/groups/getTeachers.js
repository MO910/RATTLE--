import { useGroupsStore } from "~/store/groups";
import Optimistic from "~/store/functions/Optimistic";
import groupQuery from "~/store/functions/groupQuery";

export default async function (organization_id) {
    // repair query
    const query = gql`
        query {
            organizationTeachers(organization_id: "${organization_id}") {
                first_name
            }
        }
    `;
    this.teachers = (
        await useAsyncQuery(query)
    ).data.value?.organizationTeachers;

    console.log({ teachers: this.teachers });
}
