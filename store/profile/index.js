import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
    state: () => ({
        userProfileDialog: false,
        profileEntity: null,
    }),
    actions: {},
});
