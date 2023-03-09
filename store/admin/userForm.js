import { defineStore } from "pinia";

export const useUserFormStore = defineStore("userForm", {
    state: () => ({
        userForm: {
            dialog: false,
            loading: false,
            edit: false,
            textFieldsValid: false,
            first_name: "m",
            parent_name: "m",
            email: "",
            phone: "",
            selectedCenterId: null,
            selectedGroupId: null,
            genderSelected: 0,
            rules: ["student", "parent", "teacher", "admin"],
            selectedRules: [],
        },
        assignTeacherForm: {
            dialog: false,
        },
    }),
});
