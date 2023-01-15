<template lang="pug">
v-menu(offset-y)
    template(v-slot:activator='{ props }')
        v-btn(
            v-bind='props '
            icon
            dark
            x-small
            :color="selectedColor"
        )
    v-card
        v-card-text
            v-btn.ma-3(
                v-for='color in colors'
                :key='color'
                :color="color"
                @click='this.selectedColor = color'
                icon
                dark
                x-small
            )
                v-icon(v-if='color == selectedColor') mdi-check-circle
</template>

<script>
import { useAddPlanStore } from "~/store/forms/addPlan";
import { storeToRefs } from "pinia";

export default {
    async setup() {
        // use store data
        const addPlanStore = useAddPlanStore();
        return { ...storeToRefs(addPlanStore) };
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
