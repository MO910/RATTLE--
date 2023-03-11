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
        listItems: {
            edit: {
                title: "edit",
                icon: "mdi-pencil",
            },
            remove: {
                title: "remove",
                icon: "mdi-trash-can-outline",
                color: "red",
            },
            transport: { title: "transport", icon: "mdi-arrow-decision" },
        },
    }),
    getters: {
        contextMenuItems() {
            let outList = [];
            // init
            if (this.contextMenu.type.match(/subgroup/))
                outList = [this.listItems.remove];
            else if (this.contextMenu.type.match(/user/))
                outList = [this.listItems.edit, this.listItems.remove];
            else if (this.contextMenu.type.match(/student/))
                outList = [this.listItems.transport];
            else if (this.contextMenu.type === "plan")
                outList = [this.listItems.remove];
            // add action to edit item
            if (this.contextMenu.type === "user")
                outList[0].openAction = this.editAction;
            // return
            return outList;
        },
    },
    actions: {
        editAction() {
            // console.log("params", useRoute().params);
            const userFormStore = useUserFormStore();
            const { first_name, parent_name, email, phone } =
                this.contextMenu.entity;
            const selectedRules = this.contextMenu.entity.rules.map((rule) =>
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
        },
        close() {
            this.contextMenu.dialog.show = false;
            this.contextMenu.type = "";
            this.contextMenu.entity = {};
            this.contextMenu.subgroups = [];
        },
    },
});
