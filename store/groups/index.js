import { defineStore } from "pinia";
import { useAuthStore } from "~/store/auth";
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
        groupsAsAdmin: [],
        groupsAsTeacher: [],
        groupsAsParticipant: [],
        // groups: null,
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
        //
        checkAuthForGroup(groupId) {
            const checkGroup = (group) => group.id === groupId;
            const authStore = useAuthStore();
            let auths = [];
            // loop throw all auths
            for (let auth of authStore.groupsTree) {
                if (this[auth[0]].find(checkGroup)) auths.push(auth[1]);
            }
            return auths;
        },
    },
    getters: {
        groups() {
            let authStore = useAuthStore(),
                groups = [];
            if (!authStore.user) return;
            groups.push(this.groupsAsAdmin);
            groups.push(this.groupsAsTeacher);
            groups.push(this.groupsAsParticipant);
            // filter repeated ones
            return groups
                .flat()
                .filter(
                    (group, i, arr) =>
                        arr.findIndex((v2) => v2.id === group.id) === i
                );
        },
    },
});
