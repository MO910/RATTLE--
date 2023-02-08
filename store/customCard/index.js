// pinia
import { defineStore } from "pinia";

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
            if (this.contextMenu.type === "subgroup")
                return [
                    { title: "edit", icon: "mdi-pencil" },
                    {
                        title: "remove",
                        icon: "mdi-trash-can-outline",
                        color: "red",
                    },
                ];
            else if (this.contextMenu.type.includes("student"))
                return [{ title: "transport", icon: "mdi-arrow-decision" }];
        },
    },
});
