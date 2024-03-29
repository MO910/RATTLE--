import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async ({ name }) => {
    const authStore = useAuthStore();
    // do not fetch if already fetched
    if (authStore.user) return;
    await authStore.decodeUserId();
    // get user data
    if (authStore.userId) await authStore.getUserData();
    // if not logged in go to login page
    if (name !== "login" && !authStore.loggedIn) {
        await navigateTo("/login");
    }
});
