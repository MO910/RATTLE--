<template lang="pug">
v-container
    v-row
        v-col.text-h3 {{$vuetify.locale.t("$vuetify.groups")}}
    custom-card(
        :each='groups'
        :evalRouter='evalRouter'
        :addButton='isAdmin'
        :addAction='addAction'
    )
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";
import { useAdminStore } from "~/store/admin";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use groups data
        const groupsStore = useGroupsStore();
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        // return the store
        return {
            groupsStore,
            adminStore,
            ...storeToRefs(authStore),
            ...storeToRefs(groupsStore),
        };
    },
    computed: {
        isAdmin() {
            return this.user.rules.some((rule) => rule.title.includes("OWNER"));
        },
    },
    methods: {
        evalRouter(groupId) {
            let auths = this.groupsStore.checkAuthForGroup(groupId)?.[0];
            if (auths === "admin") return `admin/groups/${groupId}`;
            if (auths === "teacher") return groupId;
        },
        async addAction() {
            await this.adminStore.createGroup({
                title: "hello",
            });
        },
    },
};
</script>

<style lang="sass" scoped>
a
    text-decoration: none !important
</style>
