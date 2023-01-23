<template lang="pug">
v-row
    v-col.text-h6(cols='12') {{$vuetify.locale.t(title)}}
    v-col(cols='12')
        | {{variable}}
        v-btn-toggle(
            v-model='selected'
            :multiple='multiple'
            :color="color"
            mandatory group borderless
        )
            v-btn.mr-3(v-for='item in each' size='small') {{evalEach(item)}}
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";

export default {
    props: {
        title: String,
        each: Array,
        selectedVar: String,
        translate: { type: Boolean, default: true },
        multiple: Boolean,
        color: String,
    },
    setup() {
        // use stores data
        const selectedVarsStore = useSelectedVarsStore();
        // return the store
        return { ...storeToRefs(selectedVarsStore) };
    },
    // update store value when select
    data: () => ({ selected: null }),
    watch: {
        selected(val) {
            // update store value
            this[this.selectedVar] = val;
            return val;
        },
    },
    // add default value from model
    mounted() {
        this.selected = this[this.selectedVar];
    },
    methods: {
        evalEach(item) {
            return !this.translate
                ? item
                : this.$vuetify.locale.t(`$vuetify.${item}`);
        },
    },
};
</script>
