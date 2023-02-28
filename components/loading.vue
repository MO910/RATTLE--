<template lang="pug">
|loading: {{loading}}
v-progress-circular(v-if="loading" :indeterminate='loading')
</template>

<script>
export default {
    async setup() {
        const nuxtApp = useNuxtApp();
        const loading = ref(false);
        nuxtApp.hook("page:start", () => {
            loading.value = true;
            console.log("page start");
        });
        nuxtApp.hook("page:finish", () => {
            loading.value = false;
            console.log("page finish");
        });
        return { loading };
    },
};
</script>
