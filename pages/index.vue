<template lang="pug">
v-container
    v-row
        v-col.text-h3 {{$vuetify.locale.t("$vuetify.groups")}}
    custom-card(:each='groupsAsAdmin' :evalRouter='evalRouter')
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use groups data
        const groupsStore = useGroupsStore();
        const authStore = useAuthStore();
        // return the store
        return {
            groupsStore,
            ...storeToRefs(authStore),
            ...storeToRefs(groupsStore),
        };
    },
    computed: {},
    methods: {
        evalRouter(groupId) {
            let auths = this.groupsStore.checkAuthForGroup(groupId)?.[0];
            if (auths === "admin") return `admin/groups/${groupId}`;
            if (auths === "teacher") return groupId;
        },
    },
};
</script>

<style lang="sass" scoped>
a
    text-decoration: none !important
</style>
