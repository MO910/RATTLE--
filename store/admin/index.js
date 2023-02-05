import { defineStore } from "pinia";
import getUsers from "./actions/getUsers";
import getOrganization from "./actions/getOrganization";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        organization_id: null,
        organization: null,
        users: [],
    }),
    actions: { getUsers, getOrganization },
});
