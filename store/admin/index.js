import { defineStore } from "pinia";
import getUsers from "./actions/getUsers";
import getOrganization from "./actions/getOrganization";
// mutate user
import createUser from "./actions/createUser";
import updateUser from "./actions/updateUser";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        organization_id: null,
        organization: null,
        users: [],
    }),
    actions: { getUsers, getOrganization, createUser, updateUser },
});
