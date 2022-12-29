<template lang="pug">
v-form(v-model="valid")
    v-container
        v-row
            v-col(cols="12" sm="6")
                v-text-field(
                    v-model="email"
                    :rules="[authStore.requiredRule]"
                    name="email"
                    autocomplete="email"
                    label="email"
                )
                v-text-field(
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[authStore.requiredRule]"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="password"
                    name="password"
                    label="password"
                    @click:append="showPassword = !showPassword"
                )
        v-row
            v-btn(
                class="text-capitalize text-start px-10"
                :loading="loading"
                :disabled="loading || (!loading && !valid)"
                color="success darken-2"
                @click="authStore.login"
                variant="outlined"
            ) login #[template(v-slot:loader) #[span loging in...]]
</template>
<script>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const authStore = useAuthStore();
        definePageMeta({ middleware: "fetch-user" });
        return { authStore, ...storeToRefs(authStore) };
    },
    data: () => ({}),
    methods: {},
};
</script>
