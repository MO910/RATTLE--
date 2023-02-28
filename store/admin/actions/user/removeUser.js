// Dependencies
// import stringify from "~/store/functions/stringify";
import Optimistic from "~/store/functions/Optimistic";
import { useGroupsStore } from "~/store/groups";
// Function
export default async function (id) {
    // GraphQl request
    const request = async () => {
        const mutation = gql`mutation { removeUser(id: "${id}")}`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
        console.log("deleted");
    };
    // await request();
    // const groupsStore = useGroupsStore();
    // const course = groupsStore.groups[0].courses[0];
    // remove from floating students array
    // course.floatingStudents = course.floatingStudents.filter(
    //     (student) => student.id !== id
    // );
    // // remove from subgroups
    // course.subgroups.forEach((subgroup) => {
    //     subgroup.students = subgroup.students.filter(
    //         (student) => student.id !== id
    //     );
    // });
    // add optimistic response to the new goal
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        dataKey: "removeUser",
    });
    await optimistic.remove({
        id,
        tree: [
            ["groups", "courses", "floatingStudents"],
            ["groups", "courses", "subgroups", "students"],
        ],
    });
}
