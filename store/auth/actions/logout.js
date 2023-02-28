// stores
import { useGroupsStore } from "~/store/groups";
import { useAdminStore } from "~/store/admin";
import { useUserFormStore } from "~/store/admin/userForm";
import { useCalendarStore } from "~/store/calendar";
import { useCustomCardStore } from "~/store/customCard";
// forms
import { useDatesStore } from "~/store/forms/dates";
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useAddPlanStore } from "~/store/forms/addPlan";
// function
export default async function () {
    // reset all stores data
    this.$reset();
    useGroupsStore().$reset();
    useAdminStore().$reset();
    useUserFormStore().$reset();
    useCalendarStore().$reset();
    useCustomCardStore().$reset();
    // forms
    useDatesStore().$reset();
    useInputNumberStore().$reset();
    useSelectedVarsStore().$reset();
    useAddPlanStore().$reset();
    // delete authorization cookie
    const cookies = useCookie("authorization");
    cookies.value = null;
    // redirect to login
    await navigateTo("/login");
}
