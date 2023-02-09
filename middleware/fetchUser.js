import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    // do not fetch if already fetched
    if (authStore.user) return;
    await authStore.decodeUserId();
    // get user data
    if (authStore.userId) await authStore.getUserData();
});
