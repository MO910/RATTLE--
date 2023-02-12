import { useGroupsStore } from "~/store/groups";

export default defineNuxtRouteMiddleware(async () => {
    const groupsStore = useGroupsStore();
    // do not fetch if already fetched
    if (groupsStore.groups?.length) return;
    // fetch
    await groupsStore.fetchGroups();
});
