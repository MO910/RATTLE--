import { useGroupsStore } from "~/store/groups";
import Optimistic from "~/store/functions/optimistic";
import stringify from "~/store/functions/stringify";

export default async function (args) {
    const floatS_Path = ["groups", "courses", "floatingStudents"],
        subgroupS_path = ["groups", "courses", "subgroups", "students"];
    const { isFloating } = args;
    console.log({ args, isFloating });
    const treeFrom = isFloating ? floatS_Path : subgroupS_path,
        treeTo = args.subgroup_id ? subgroupS_path : floatS_Path;
    // delete args.treeTo;
    delete args.isFloating;
    const stringifyArgs = stringify(args);
    // repair query
    async function request() {
        const mutation = gql`mutation { transportToSubgroup(${stringifyArgs}) }`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    }
    // Optimistic Response
    const optimistic = new Optimistic({
        state: useGroupsStore(),
        request,
        dataKey: "transportToSubgroup",
    });
    // remove
    await optimistic.transport({
        removeId: args.student_id,
        addId: args.subgroup_id || args.course_id,
        treeFrom,
        treeTo,
    });
}
