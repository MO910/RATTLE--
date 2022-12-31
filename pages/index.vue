<template lang="pug">
v-container
    v-row.mt-8
        v-col(cols='3' v-for='rule in user.rules') 
            v-card.pt-7.pb-10.px-5
                v-card-title {{rule.title}}
</template>

<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const authStore = useAuthStore();
        definePageMeta({ middleware: "fetch-user" });
        return { ...storeToRefs(authStore) };
    },
};
</script>
