<template lang="pug">
v-form(v-model="valid")
    v-container
        v-row
            v-col(cols="12" sm="6")
                v-text-field(
                    v-model="email"
                    :rules="[requiredRole]"
                    name="email"
                    autocomplete="email"
                    label="email"
                )
                v-text-field(
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[requiredRole]"
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
                @click="login"
                outlined
            ) login #[template(v-slot:loader) #[span loging in...]]
</template>
<script>
export default {
    async setup() {
        const headers = useRequestHeaders(["cookie"]);
        const data = await useFetch("/api/user", {
            headers: { cookie: headers.cookie },
        });
        console.log(data);
    },
    data: () => ({
        valid: false,
        emailRules: [(v) => /(.+@.+)|SHARK/.test(v) || "E-mail must be valid"],
        showPassword: false,
        loading: false,
        password: "",
        requiredRole: (v) => !!v || "this field is required",
    }),
    methods: {
        login() {
            console.log("subbbbbbbb");
        },
    },
};
</script>
