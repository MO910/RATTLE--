<template lang="pug">
v-row.pt-10
    v-col.mb-5.col-xs-12(
        cols='12'
        lg='4'
        md='6'
        sm='12'
        v-for='item in each'
    )
        NuxtLink(:to='folderRouter(item)')
            v-card.pt-7.pb-10.px-5(v-ripple)
                v-card-title {{evalTitle(item)}}
</template>

<script>
export default {
    props: {
        to: { default: "id" },
        title: { default: "title" },
        each: Array,
        translate: Boolean,
    },
    methods: {
        evalTitle(item) {
            return this.translate
                ? this.$vuetify.locale.t(item[this.title])
                : item[this.title];
        },
        folderRouter(item) {
            let router = useRoute().fullPath;
            router = router.replace(/\/$/, "");
            return `${router}/${item[this.to]}`;
        },
    },
};
</script>
