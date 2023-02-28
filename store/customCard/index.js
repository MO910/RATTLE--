// pinia
import { defineStore } from "pinia";
import { useUserFormStore } from "~/store/admin/userForm";

export const useCustomCardStore = defineStore("customCard", {
    state: () => ({
        confirmDialogLoading: false,
        contextMenu: {
            // items:
            show: false,
            type: "",
            dialog: { show: false, type: "" },
            entity: {},
            subgroups: [],
        },
    }),
    getters: {
        contextMenuItems() {
            let outList = [];
            // init
            if (this.contextMenu.type.match(/subgroup|user/))
                outList = [
                    { title: "edit", icon: "mdi-pencil" },
                    {
                        title: "remove",
                        icon: "mdi-trash-can-outline",
                        color: "red",
                    },
                ];
            else if (this.contextMenu.type === "floating_student")
                outList = [{ title: "transport", icon: "mdi-arrow-decision" }];
            // add action to edit item
            if (this.contextMenu.type === "user") {
                outList[0].openAction = () => {
                    // console.log("params", useRoute().params);
                    const userFormStore = useUserFormStore();
                    const { first_name, parent_name, email, phone } =
                        this.contextMenu.entity;
                    const selectedRules = this.contextMenu.entity.rules.map(
                        (rule) =>
                            userFormStore.userForm.rules.indexOf(rule.title)
                    );
                    console.log({ selectedRules });
                    const newData = {
                        dialog: true,
                        edit: true,
                        first_name,
                        parent_name,
                        email,
                        phone,
                        selectedRules,
                        // selectedCenterId: null,
                        // selectedGroupId: null,
                    };
                    userFormStore.userForm = {
                        ...userFormStore.userForm,
                        ...newData,
                    };
                };
                // outList[0].closeAction = this.close;
            }
            // return
            return outList;
        },
    },
    actions: {
        close() {
            this.contextMenu.dialog.show = false;
            this.contextMenu.type = "";
            this.contextMenu.entity = {};
            this.contextMenu.subgroups = [];
        },
    },
});
