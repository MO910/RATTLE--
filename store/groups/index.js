import { defineStore } from "pinia";
import fetchGroups from "./actions/fetchGroups";

export const useGroupsStore = defineStore("groups", {
    state: () => ({
        groups: [],
    }),
    actions: { fetchGroups },
});
