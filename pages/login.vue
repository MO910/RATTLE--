<template lang="pug">
v-form(v-model="valid")
    v-container
        v-row
            v-col(cols="12" sm="6")
                v-text-field(
                    v-model="id_number"
                    :rules="[authStore.requiredRule]"
                    name="id_number"
                    autocomplete="id_number"
                    label="id_number"
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
                @click="callLogin"
                variant="outlined"
            ) login #[template(v-slot:loader) #[span loging in...]]
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
        return { authStore, ...storeToRefs(authStore) };
    },
    data: () => ({
        badfsafasdf: ["home", "about"],
    }),
    methods: {
        async callLogin() {
            await this.authStore.login();
            // const i = useContext();
            this.$router.push("/");
        },
    },
};
</script>
