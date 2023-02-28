<template lang="pug">
NuxtLink(v-if='link' :to='to') #[slot]
slot(v-else)
</template>

<script>
export default {
    props: ["link", "to"],
};
</script>

<style scoped lang="sass">
div
    color: red
</style>
