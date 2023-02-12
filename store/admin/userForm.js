import { defineStore } from "pinia";

export const useUserFormStore = defineStore("userForm", {
    state: () => ({
        userForm: {
            dialog: false,
            loading: false,
            edit: false,
            textFieldsValid: false,
            first_name: "",
            parent_name: "",
            email: "",
            phone: "",
            selectedCenterId: null,
            selectedGroupId: null,
            genderSelected: null,
            rules: ["student", "parent", "teacher", "admin"],
            selectedRules: [],
        },
    }),
    // getters: {
    //     genders() {
    //         return [
    //             {
    //                 title: this.$vuetify.locale.t("$vuetify.male"),
    //                 value: "male",
    //             },
    //             {
    //                 title: this.$vuetify.locale.t("$vuetify.female"),
    //                 value: "female",
    //             },
    //         ];
    //     },
    // },
});
