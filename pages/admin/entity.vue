<template lang="pug">
v-container
    v-row.mb-8
        v-col.text-h3(cols='12') {{$vuetify.locale.t(`$vuetify.${mode}`)}}
        //- searching
        v-col(cols='12' v-if='mode == "users"')
            | Rules:
            v-chip-group(
                v-model='tags'
                active-class='primary--text' column multiple mandatory
            )
                v-chip(v-for='rule in rules' :key='rule' filter) {{ rule }}
</template>

<script>
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";
import { useAuthStore } from "~/store/auth";
export default {
    // async middleware({ store, redirect, route, $auth }) {
    //     console.log({ store, users: adminStore.users });
    //     const adminStore = useAdminStore();
    //     await adminStore.getUsers();
    // },
    async setup() {
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        // fetch data middleware
        definePageMeta({
            middleware: ["fetch-user", "admin-entity"],
        });
        // // use auth data
        // const authStore = useAuthStore();
        return { ...storeToRefs(authStore), ...storeToRefs(adminStore) };
    },
    mounted() {
        // select all rules
        if (this.mode == "users")
            this.tags = Array.from(
                { length: this.rules.length },
                (_, i) => i * 1
            );
    },
    data() {
        return {
            mode: this.$route.query?.mode,
            page: 1,
            pageCount: 2,
            itemsPerPage: 10,
            select: false,
            search: "",
            tempValue: "",
            newGroupSelectedId: "",
            tags: [],
        };
    },
    computed: {
        allEntitiesInfo() {
            return this.users?.map((user) => {
                const group = user.groups?.map((g) => g.title)?.join(", ");
                const subgroup = user.subgroups
                    ?.map((g) => g.title)
                    ?.join(", ");
                return { ...user, group, subgroup };
            });
        },
        rules() {
            let rules = this.allEntitiesInfo
                .map((u) => u.rules)
                .flat()
                .map((r) => r.title);
            return Array.from(new Set(rules));
        },
    },
};
</script>
