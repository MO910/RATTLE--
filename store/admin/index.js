import { defineStore } from "pinia";
import getUsers from "./actions/getUsers";
import getOrganization from "./actions/getOrganization";
import createUser from "./actions/createUser";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        organization_id: null,
        organization: null,
        users: [],
        addUserDialog: false,
    }),
    actions: { getUsers, getOrganization, createUser },
});
