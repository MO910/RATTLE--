<template lang="pug">
v-row.pt-10
    v-col.mb-5.col-xs-12(
        :lg='lg' md='6' sm='12'
        v-for='item in each'
    )
        linkOr(:link='link' :to='folderRouter(item)')
            v-card.py-7.px-5(:v-ripple='link')
                v-card-title.text-h5 {{applyEvalTitle(item)}}
                v-card-text(v-if='chips')
                    v-chip.ma-2(
                        v-for='chip in evalChips(item)'
                    ) {{evalChipsTitle(chip)}}
                v-card-text
                    <slot :student_id='item.id'></slot>
</template>

<script>
import linkOr from "./linkOr.vue";

export default {
    props: {
        // loop array
        each: Array,
        // title
        title: { default: "title" },
        evalTitle: Function,
        translate: Boolean,
        // router
        to: { default: "id" },
        evalRouter: Function,
        // chips
        chips: String,
        evalChipsTitle: Function,
        lg: { type: Number, default: 4 },
        link: { default: true },
    },
    components: { linkOr },
    methods: {
        applyEvalTitle(item) {
            // eval title
            if (this.evalTitle) var title = this.evalTitle(item);
            else title = item[this.title];
            // translate the title
            return this.translate ? this.$vuetify.locale.t(title) : title;
        },
        // evaluate the router if any
        folderRouter(item) {
            let router = useRoute().fullPath;
            router = router.replace(/\/$/, "");
            let to = item[this.to];
            if (this?.evalRouter) to = this.evalRouter(item[this.to]);
            return `${router}/${to}`;
        },
        // get all chips array
        evalChips(item) {
            return item?.[this.chips];
        },
    },
};
</script>

<style lang="sass" scoped>
.v-card
    height: 100%
</style>
