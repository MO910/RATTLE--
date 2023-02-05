import { defineStore } from "pinia";
import fetchGroups from "./actions/fetchGroups";
import getSubgroupHistoryAtDate from "./actions/getSubgroupHistoryAtDate";
import updatePlanHistory from "./actions/updatePlanHistory";
import groupAttendanceAtDate from "./actions/attendance/groupAttendanceAtDate";
import updateAttendance from "./actions/attendance/updateAttendance";

export const useGroupsStore = defineStore("groups", {
    state: () => ({
        groups: null,
        attendanceHistory: [],
    }),
    actions: {
        fetchGroups,
        getSubgroupHistoryAtDate,
        updatePlanHistory,
        // attendance
        groupAttendanceAtDate,
        updateAttendance,
    },
});
