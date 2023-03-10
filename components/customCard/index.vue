<template lang="pug">
v-row.pt-5(v-if='each?.length')
    v-col.mb-5.col-xs-12(
        :lg='lg' :md='md' sm=12
        v-for='item in each'
    )
        linkOr(:link='link' :to='folderRouter(item)')
            v-card.py-7.px-5(
                :id='item.id'
                :color='item.color'
                :v-ripple='link'
                @contextmenu.prevent='applyOpenContext($event, item)'
                @click='clickEvent(item)'
            )
                v-card-title(:class='titleStyling') {{applyEvalTitle(item)}}
                v-card-text(v-if='chips')
                    v-chip.ma-2(
                        v-for='chip in evalChips(item)'
                    ) {{evalChipsTitle(chip)}}
                v-card-text
                    slot(:entity='item')
                v-card-text(v-if='description') {{item.description}}
    //- add new entity card
    v-col.mb-5.col-xs-12(
        v-if='addButton'
        :lg='lg' :md='md' sm=12
    )
        v-btn.add.py-7.px-5(
            @click='addAction'
            block variant='outlined'
        ) 
            v-card-title.text-center
                span.px-2 {{$vuetify.locale.t("$vuetify.add")}}
                v-icon mdi-plus
//- contextmenu
contextmenu(v-if='openContext')
//- slot(name='contextmenu')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";
// components
import linkOr from "./linkOr";
import contextmenu from "~/components/customCard/contextmenu";

export default {
    props: {
        // loop array
        each: Array,
        // color: String,
        // title
        title: { default: "title" },
        evalTitle: Function,
        translate: Boolean,
        titleStyling: String,
        // router
        to: { default: "id" },
        evalRouter: Function,
        // chips
        chips: String,
        evalChipsTitle: Function,
        link: { default: true },
        description: { default: false },
        // sizes
        lg: { type: Number, default: 4 },
        md: { type: Number, default: 6 },
        // contextmenu
        openContext: Function,
        // add button
        addButton: Boolean,
        addAction: Function,

        clickEvent: Function,
    },
    setup() {
        // use groups data
        const customCardStore = useCustomCardStore();
        // return the store
        return { ...storeToRefs(customCardStore) };
    },
    components: { linkOr, contextmenu },
    methods: {
        applyOpenContext(e, entity) {
            this.contextMenu.entity = entity;
            // reposition
            $(".contextMenu").css({
                top: e.pageY + "px",
                left: e.pageX + "px",
            });
            // open
            this.contextMenu.show = false;
            this.$nextTick(() => {
                this.contextMenu.show = true;
            });
            // apply
            this.openContext();
        },
        applyEvalTitle(item) {
            // eval title
            if (this.evalTitle) var title = this.evalTitle(item);
            else title = item[this.title];
            // translate the title
            if (this.translate)
                return this.$vuetify.locale.t(
                    title.includes("$vuetify.") ? title : `$vuetify.${title}`
                );
            return title;
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
a .v-card, .v-btn
    height: 100%
    transition: all .5s ease
    &:hover:not(.v-btn):not([class*='bg-'])
        background: #4c4c8b
        box-shadow: 0px 0px 14px 3px #4c4c8b70
</style>
