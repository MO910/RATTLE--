<template lang="pug">
v-container
    custom-card(:each='user.rules' to='title' :evalRouter='ruleRouter' translate)
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use auth data
        const authStore = useAuthStore();
        return { ...storeToRefs(authStore) };
    },
    methods: {
        ruleRouter(rule) {
            switch (rule.toLowerCase()) {
                case "teacher":
                    return "groups";
                case "owner_organization":
                case "owner_center":
                    return "admin";
                case "parent":
                    return "children";
                default:
                    return "/";
            }
        },
    },
};
</script>

<style lang="sass" scoped>
a
    text-decoration: none !important
</style>
