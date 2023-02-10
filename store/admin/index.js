import { defineStore } from "pinia";
import getGroupsAsAdmin from "./actions/getGroupsAsAdmin";
import getOrganization from "./actions/getOrganization";
// mutate user
import createUser from "./actions/createUser";
import updateUser from "./actions/updateUser";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        organization_id: null,
        groupsAsAdmin: null,
        groupsAsAdmin: [],
        // tabs
        activeTab: null,
        activeSubTab: null,
    }),
    actions: { getGroupsAsAdmin, getOrganization, createUser, updateUser },
});
