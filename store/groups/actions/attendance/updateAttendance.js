import stringify from "~/store/functions/stringify";
import Optimistic from "~/store/functions/Optimistic";

export default async function (args) {
    // do not fetch if already fetched
    // if (this.attendanceHistory.some((h) => h.date === args.date)) return;
    const stringifyArgs = stringify(args);
    // GraphQl request
    async function request() {
        const mutation = gql`mutation {updateAttendance(${stringifyArgs})}`;
        const { clients } = useApollo();
        return (await clients.default.mutate({ mutation })).data;
    }
    // add optimistic response to the new goal
    const optimistic = new Optimistic({
        state: this,
        request,
        dataKey: "updateAttendance",
    });
    // let tree = ['AttendanceHistory[${}]']
    let index;
    this.attendanceHistory.some((history, i) => {
        let condition = history.date.slice(0, 10) === args.date;
        if (condition) index = i;
        return condition;
    });
    await optimistic.update({
        id: args.user_id,
        requestData: args,
        tree: [`attendanceHistory[${index}].students`],
        targetArray: "attendance",
    });
}
