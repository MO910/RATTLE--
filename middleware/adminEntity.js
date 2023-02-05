import { useAuthStore } from "~/store/auth";
import { useAdminStore } from "~/store/admin";

export default defineNuxtRouteMiddleware(async ({ query }) => {
    // stores
    const adminStore = useAdminStore();
    // console.log({ to, t, y });
    const mode = query.mode;
    // do actions
    await adminStore.getOrganization();
    if (mode === "users") await adminStore.getUsers();
});
