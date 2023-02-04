<template lang="pug">
.inputNumber.d-flex.align-center(:class='textColor' :id='id_key')
    v-icon.decrease(
        v-show='!freeze'
        :class='`${textColor} order-${isEn ? 0 : 2}`'
    ) {{arithmetic ? 'mdi-minus' : 'mdi-chevron-left'}}
    v-icon.increase(
        v-show='!freeze'
        :class='`${textColor} order-${isEn ? 2 : 0}`'
    ) {{arithmetic ? 'mdi-plus' : 'mdi-chevron-right'}}
    //- :open-on-click='true'
    .content.mx-2(
        :data-current='init' 
        :data-before='+init - 1' 
        :data-after='+init + 1'
        :data-digitWidth='digitWidth'
        :data-min='min'
        :data-max='max'
        :data-format='format'
        :data-freeze='freeze'

        :contenteditable='contenteditable'
        :class='background'

        @dblclick='contenteditable = true'
        @doubleTap='contenteditable = true'
        @blur='contenteditable = false'

        @mousedown='tooltip = true'
        @touchstart='tooltip = true'
        @mouseup='tooltip = false'
        @touchend='tooltip = false'
    )
        div(v-text='init')
        v-tooltip(
            v-model='tooltip'
            :open-on-hover='false'
            transition="scroll-y-transition"
            location='top'
            activator="parent"
        )  {{$vuetify.locale.t('$vuetify.drag2Arrow')}}
</template>

<script>
// store
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { storeToRefs } from "pinia";
// function
import { counter } from "~/static/js/inputNumber.js";

export default {
    async setup() {
        // use store data
        const inputNumberStore = useInputNumberStore();
        return { ...storeToRefs(inputNumberStore) };
    },
    data: () => ({
        contenteditable: false,
        tooltip: false,
    }),
    props: {
        model: String,
        maxModel: String,
        background: String,
        text_color: String,
        init: Number,
        digitWidth: { default: 5 },
        min: { default: 1 },
        max: Number,
        format: String,
        freeze: { default: false },
        arithmetic: Boolean,
    },
    mounted() {
        const content = $(`.inputNumber#${this.id_key} .content`);
        $(window).on("mouseup", () => (this.tooltip = false));
        // observer to update the store every time the current attr changed
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // update the current model when change
                const newCurrent = mutation.target.dataset.current;
                // update pinia model
                this[this.model] = newCurrent;
                //
                const newMax = mutation.target.dataset.max;
                // update pinia model
                this[this.maxModel] = newMax;
            });
        });
        observer.observe(content[0], {
            attributes: true,
            attributeFilter: ["data-current", "data-max"],
        });
        // initialize the function
        counter(content);
    },
    computed: {
        textColor() {
            return this.text_color
                ?.split(" ")
                .map((c) => c + "--text")
                .join(" ");
        },
        isEn() {
            return this.$vuetify.locale.current == "en";
        },
        id_key() {
            return this.model;
        },
    },
};
</script>

<style scoped lang="sass">
@import "@/assets/inputNumber"
</style>
