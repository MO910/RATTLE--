<template lang="pug">
v-container
    //- title
    v-row
        v-col.text-h3 {{$vuetify.locale.t("$vuetify.groups")}}
    //- groups
    custom-card(
        :each='groups'
        :evalRouter='evalRouter'
        :addButton='isAdmin'
        :addAction='addAction'
    )
    //- dialog
    create-group-dialog
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";
import { useAdminStore } from "~/store/admin";
import { useCreateGroupStore } from "~/store/admin/createGroup";
// components
import createGroupDialog from "~/components/admin/createGroupDialog";

export default {
    components: { createGroupDialog },
    async setup() {
        // fetch user
        definePageMeta({ middleware: ["fetch-user", "fetch-groups"] });
        // use groups data
        const groupsStore = useGroupsStore();
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        const createGroupStore = useCreateGroupStore();
        // return the store
        return {
            groupsStore,
            adminStore,
            ...storeToRefs(authStore),
            ...storeToRefs(groupsStore),
            ...storeToRefs(createGroupStore),
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
            this.dialog = true;
        },
    },
};
</script>

<style lang="sass" scoped>
a
    text-decoration: none !important
</style>
