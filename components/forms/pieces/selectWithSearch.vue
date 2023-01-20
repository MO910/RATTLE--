<template lang="pug">
v-row
    v-col(cols='12')
        v-select(
            :label="label"
            v-model='selected'
            :items='searchResults'
            item-title="name"
            item-value="index"
        )
            template(v-slot:prepend-item)
                v-list-item
                    v-text-field.d-block(
                        v-model="search"
                        name="search"
                        :label="$vuetify.locale.t('$vuetify.search')"
                    )
                v-divider
</template>

<script>
// stores
import { storeToRefs } from "pinia";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useQuranStore } from "~/store/quran";

export default {
    props: ["label", "items", "selectedVar", "translate"],
    setup() {
        // use stores data
        const selectedVarsStore = useSelectedVarsStore();
        const quranStore = useQuranStore();
        // return the store
        return {
            ...storeToRefs(selectedVarsStore),
            ...storeToRefs(quranStore),
        };
    },
    // update store value when select
    data: () => ({
        selected: null,
        search: "",
    }),
    watch: {
        selected(val) {
            // update store value
            this[this.selectedVar] = val;
            return val;
        },
    },
    computed: {
        searchResults() {
            const searchForReg = new RegExp(
                    this.surahSearch.replace(/\s/g, "")
                ),
                cleanReg = new RegExp("[^\u0621-\u063A^\u0641-\u064A]", "g");
            // get results
            let results = this.items.filter((s) =>
                s.name.replace(cleanReg, "").match(searchForReg)
            );
            // reversed
            if (this.direction) results = results.reverse();
            return results;
        },
    },
    methods: {},
};
</script>
