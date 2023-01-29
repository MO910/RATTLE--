import { defineStore } from "pinia";
import fetchGroups from "./actions/fetchGroups";
import getSubgroupHistoryAtDate from "./actions/getSubgroupHistoryAtDate";
import updatePlanHistory from "./actions/updatePlanHistory";

export const useGroupsStore = defineStore("groups", {
    state: () => ({
        groups: null,
    }),
    actions: { fetchGroups, getSubgroupHistoryAtDate, updatePlanHistory },
});
