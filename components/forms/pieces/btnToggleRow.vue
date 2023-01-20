<template lang="pug">
v-row
    v-col.text-h6(cols='12') {{$vuetify.locale.t(title)}}
    v-col(cols='12')
        | {{variable}}
        v-btn-toggle(
            v-model='selected'
            mandatory group borderless
        )
            v-btn.mr-3(v-for='item in each') {{evalEach(item)}}
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";

export default {
    props: ["title", "each", "selectedVar", "translate"],
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
    methods: {
        evalEach(item) {
            return this.$vuetify.locale.t(`$vuetify.${item}`);
        },
    },
};
</script>
