import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async ({ params }) => {
    const authStore = useAuthStore();
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
        if (authStore.user[auth[0]].find(checkGroup)) {
            authStore.authorizationForCurrentGroup = auth[1];
            break;
        }
    }
});
