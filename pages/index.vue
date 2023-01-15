<template lang="pug">
v-container
    folder(:each='user.rules' to='title' :evalRouter='ruleRouter' translate)
</template>

<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

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
                    break;
                case "owner":
                    return "admin";
                    break;
                case "parent":
                    return "children";
                    break;
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
