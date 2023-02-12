import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";

export default defineNuxtRouteMiddleware(async ({ params }) => {
    const authStore = useAuthStore();
    const groupsStore = useGroupsStore();
    // do nothing if there is any authorization recorded
    if (authStore.authorizationForCurrentGroup.length) return;
    // check auth for group
    const checkGroup = (group) => group.id === params.groupId;
    // loop throw all auths
    for (let auth of authStore.groupsTree) {
        if (groupsStore[auth[0]].find(checkGroup))
            authStore.authorizationForCurrentGroup.push(auth[1]);
    }
    // if no authorization found for this user redirect home
    if (!authStore.authorizationForCurrentGroup?.length) await navigateTo("/");
});
