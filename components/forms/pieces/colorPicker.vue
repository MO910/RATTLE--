<template lang="pug">
v-menu(offset-y)
    template(v-slot:activator='{ props }')
        v-btn(
            v-bind='props'
            size='x-small'
            icon dark
            :color="selected"
        )
    v-card
        v-card-text
            v-btn.ma-3(
                v-for='color in colors'
                :key='color'
                :color="color"
                @click='selected = color'
                size='x-small'
                icon dark 
            )
                v-icon(v-if='color == selectedColor') mdi-check-circle
</template>

<script>
import { storeToRefs } from "pinia";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";

export default {
    props: ["selectedVar", "colors"],
    setup() {
        // use stores data
        const selectedVarsStore = useSelectedVarsStore();
        // return the store
        return { ...storeToRefs(selectedVarsStore) };
    },
    mounted() {
        // pick a random color to initialize the component
        const randomIndex = Math.random() * this.colors.length;
        this.selected = this.colors[~~randomIndex];
    },
    // update store value when select
    data: () => ({ selected: null }),
    watch: {
        selected(val) {
            this[this.selectedVar] = val;
            return val;
        },
    },
};
</script>

<style lang="sass" scoped>
.pickColor
    height: 1.3em
    aspect-ratio: 1/1
    background: red
    display: inline-block
    border-radius: 50%
</style>
