<template lang="pug">
v-container
    v-row.mt-8
        v-col(cols='3' v-for='rule in user.rules') 
            folder(:title='rule.title' :to='ruleRouter(rule.title)')
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
