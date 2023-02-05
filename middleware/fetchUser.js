import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    // do not fetch if already fetched
    if (authStore.user) return;
    await authStore.decodeUserId();
    if (authStore.userId) {
        // get user data
        await authStore.getUserData();
    }
});
