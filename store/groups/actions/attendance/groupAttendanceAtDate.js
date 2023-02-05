import stringify from "~/store/functions/stringify";
export default async function (args) {
    // do not fetch if already fetched
    // if (this.attendanceHistory.some((h) => h.date === args.date)) return;
    const stringifyArgs = stringify(args);
    // repair query
    const query = gql`
        query {
            groupAttendanceAtDate(${stringifyArgs}) {
                id
                first_name
                parent_name
                email
                phone
                gender
                attendance{
                    attendance_status
                    note
                }
            }
        }
    `;
    try {
        const {
            data: {
                value: { groupAttendanceAtDate },
            },
        } = await useAsyncQuery(query);
        this.attendanceHistory.push({
            date: args.date,
            students: groupAttendanceAtDate,
        });
    } catch (err) {
        console.log(err);
    }
}
