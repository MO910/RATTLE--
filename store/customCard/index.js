// pinia
import { defineStore } from "pinia";

export const useCustomCardStore = defineStore("customCard", {
    state: () => ({
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
            // console.log(this.type);
            if (this.contextMenu.type === "subgroup")
                return [
                    { title: "edit", icon: "mdi-pencil" },
                    {
                        title: "remove",
                        icon: "mdi-trash-can-outline",
                        color: "red",
                    },
                ];
        },
    },
});
