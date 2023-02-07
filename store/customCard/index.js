// pinia
import { defineStore } from "pinia";

export const useCustomCardStore = defineStore("customCard", {
    state: () => ({
        subgroupContextMenu: {
            items: [
                { title: "edit", icon: "mdi-pencil" },
                {
                    title: "remove",
                    icon: "mdi-trash-can-outline",
                    color: "red",
                },
            ],
            show: false,
            type: "",
            dialog: { show: false, type: "" },
            entity: {},
            subgroups: [],
        },
    }),
});
