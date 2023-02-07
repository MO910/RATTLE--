<template lang="pug">
v-menu(
    content-class='subgroupContextMenu'
    v-model='subgroupContextMenu.show'
    transition="scroll-y-transition" eager
)
    v-list(width='200')
        v-list-item(
            v-for='item in subgroupContextMenu.items'
            @click='openDialog(item.title)'
            :class='`text-${item.color}`'
        )
            template(v-slot:prepend)
                v-icon.text--secondary(size='small') {{item.icon}}
            v-list-item-title {{item.title}}
</template>

<script>
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";

export default {
    props: ["ele"],
    setup() {
        // use groups data
        const customCardStore = useCustomCardStore();
        // return the store
        return { ...storeToRefs(customCardStore) };
    },
    methods: {
        openDialog(type) {
            this.contextmenu.dialog.show = true;
            this.contextmenu.dialog.type = type;
        },
    },
};
</script>

//
<style lang="sass">
// .subgroupContextMenu
//     x: 200px
//
</style>
