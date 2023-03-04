import { defineStore } from "pinia";
import getOrganization from "./actions/getOrganization";
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
    }),
    actions: {
        // organization
        getOrganization,
        // user
        createUser,
        updateUser,
        removeUser,
    },
});
