import { defineStore } from "pinia";
import removePlan from "./actions/removePlan";

export const usePlansStore = defineStore("plans", {
    state: () => ({ removePlanResponse: [] }),
    actions: { removePlan },
});
