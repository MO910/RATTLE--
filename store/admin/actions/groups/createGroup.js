import { useGroupsStore } from "~/store/groups";
import Optimistic from "~/store/functions/Optimistic";
import groupQuery from "~/store/functions/groupQuery";

export default async function (args) {
    // repair query
    async function request() {
        const mutation = gql`mutation { ${groupQuery("createGroup", args)} }`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    }
    // add a Quran course after creating the group
    async function addCourse(groupId) {
        const mutation = gql`
            mutation { 
                createCourse(title: "qquran", group_id: "${groupId}") {
                    id
                    title
                    description
                    floatingStudents {
                        id
                    }
                    subgroups {
                        id
                    }
                }
            }`;
        const { clients } = useApollo();
        const response = (await clients.default.mutate({ mutation })).data;
        console.log({ courses: [response?.createCourse] });
        return { courses: [response?.createCourse] };
    }
    // Optimistic Response
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        dataKey: "createGroup",
    });
    // add
    await optimistic.add({
        id: args.course_id,
        requestData: args,
        callbackAfter: addCourse,
        addCallbackResponse: true,
        nodePath: "groupsAsAdmin",
    });
}
