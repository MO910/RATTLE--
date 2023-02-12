import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async ({ params }) => {
    const authStore = useAuthStore();
    // do nothing if there is any authorization recorded
    if (authStore.authorizationForCurrentGroup.length) return;
    // check auth for group
    const checkGroup = (group) => group.id === params.groupId;
    // all authes to check
    const auths = [
        // is admin
        ["groupsAsAdmin", "admin"],
        // is teacher
        ["groupsAsTeacher", "teacher"],
        // is participant
        ["groupsAsParticipant", "participant"],
    ];
    // loop throw all aths
    for (let auth of auths) {
        if (authStore.user[auth[0]].find(checkGroup))
            authStore.authorizationForCurrentGroup.push(auth[1]);
    }
});
