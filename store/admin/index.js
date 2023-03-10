import { defineStore } from "pinia";
import getOrganization from "./actions/getOrganization";
import getTeachers from "./actions/groups/getTeachers";
// mutate user
import createUser from "./actions/user/createUser";
import updateUser from "./actions/user/updateUser";
import removeUser from "./actions/user/removeUser";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        organization_id: null,
        groupsAsAdmin: null,
        groupsAsAdmin: [],
        // tabs
        activeTab: null,
        activeSubTab: null,
        // group settings
        groupSettingsDialog: false,
        teachers: [],
        //
        userProfileDialog: false,
    }),
    actions: {
        // organization
        getOrganization,
        // user
        createUser,
        updateUser,
        removeUser,
        //
        getTeachers,
    },
});
