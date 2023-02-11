import { defineStore } from "pinia";
import login from "./actions/login";
import decodeUserId from "./actions/decodeUserId";
import getUserData from "./actions/getUserData";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        loading: false,
        userId: null,
        loggedIn: false,

        user: null,

        valid: false,
        loading: false,
        showPassword: false,

        email: "",
        password: "",

        authorizationForCurrentGroup: null,
    }),
    actions: {
        // text field rules
        requiredRule: (v) => !!v || "this field is required",
        emailRules: [(v) => /(.+@.+)|SHARK/.test(v) || "E-mail must be valid"],
        // login action and store the res in cookies
        login,
        // decode cookies to get user id
        decodeUserId,
        // get user data
        getUserData,
    },
});
