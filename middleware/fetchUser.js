import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    // const cookies = useCookie("authorization");
    await authStore.decodeUserId();
    if (authStore.userId) {
        // get user data
        await authStore.getUserData();
    }
});
