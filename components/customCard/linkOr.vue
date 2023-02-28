<template lang="pug">
//- NuxtLink(v-if='link' :to='to' external) #[slot]
div(v-if='link' @click='rout') #[slot]
slot(v-else)
</template>

<script>
export default {
    props: ["link", "to"],
    methods: {
        rout() {
            const router = useRouter();
            router.push({ path: this.to });
        },
    },
};
</script>

<style scoped lang="sass">
div
    color: red
</style>
