import { defineStore } from "pinia";
import fetchGroups from "./actions/fetchGroups";
import getSubgroupHistoryAtDate from "./actions/getSubgroupHistoryAtDate";
import updatePlanHistory from "./actions/updatePlanHistory";
// subgroup
import createSubgroup from "./actions/subgroup/createSubgroup";
import removeSubgroup from "./actions/subgroup/removeSubgroup";
import transportToSubgroup from "./actions/subgroup/transportToSubgroup";
// attendance
import groupAttendanceAtDate from "./actions/attendance/groupAttendanceAtDate";
import updateAttendance from "./actions/attendance/updateAttendance";

export const useGroupsStore = defineStore("groups", {
    state: () => ({
        groups: null,
        attendanceHistory: [],
        addSubgroupDialog: false,
    }),
    actions: {
        fetchGroups,
        getSubgroupHistoryAtDate,
        updatePlanHistory,
        // subgroup
        createSubgroup,
        removeSubgroup,
        transportToSubgroup,
        // attendance
        groupAttendanceAtDate,
        updateAttendance,
    },
});
