import { useGroupsStore } from "~/store/groups";

export default defineNuxtRouteMiddleware(async () => {
    const groupsStore = useGroupsStore();
    // do not fetch if already fetched
    if (groupsStore.groups) return;
    // fetch
    await groupsStore.fetchGroups();
});
