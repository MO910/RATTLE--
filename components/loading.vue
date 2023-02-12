<template lang="pug">
v-progress-circular(v-if="loading" :indeterminate='loading')
</template>

<script>
export default {
    async setup() {
        const nuxtApp = useNuxtApp();
        const loading = ref(false);
        nuxtApp.hook("page:start", () => (loading.value = true));
        nuxtApp.hook("page:finish", () => (loading.value = false));
        return { loading };
    },
};
</script>
