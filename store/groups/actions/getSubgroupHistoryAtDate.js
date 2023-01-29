import stringify from "~/store/functions/stringify";
import { useDatesStore } from "~/store/forms/dates";

export default async function (args) {
    const stringifyArgs = stringify(args);
    // repair query
    const datesStore = useDatesStore();
    const query = gql`
        query {
            subgroupHistoryAtDate(${stringifyArgs}) {
                plan_id
                custom_plan_id
                student_id
                date
                amount_done
                grade
            }
        }
    `;
    try {
        const {
            data: {
                value: { subgroupHistoryAtDate },
            },
        } = await useAsyncQuery(query);
        // update store
        subgroupHistoryAtDate?.forEach((history) => {
            datesStore.selectedDateHistory.push(history);
        });
    } catch (err) {
        console.log(err);
    }
}
