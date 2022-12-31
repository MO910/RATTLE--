<template lang="pug">
NuxtLink(:to='folderRouter')
    v-card.pt-7.pb-10.px-5(v-ripple)
        v-card-title {{title}}
</template>

<script>
export default {
    props: ["to", "title"],
    computed: {
        folderRouter() {
            let router = useRoute().fullPath;
            router = router.replace(/\/$/, "");
            return `${router}/${this.to}`;
        },
    },
};
</script>

<style lang="sass" scoped>
a
    text-decoration: none !important
</style>
