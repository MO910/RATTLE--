import { defineStore } from "pinia";
import createGroup from "./actions/groups/createGroup";

export const useCreateGroupStore = defineStore("createGroup", {
    state: () => ({
        dialog: false,
        loading: false,
        teacherId: null,
        centerId: null,
        title: "",
        description: "",
    }),
    actions: { createGroup },
});
