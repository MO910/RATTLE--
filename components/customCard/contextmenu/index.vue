<template lang="pug">
v-menu(
    content-class='contextMenu'
    v-model='contextMenu.show'
    transition="scroll-y-transition" eager
)
    v-list(width='200')
        v-list-item(
            v-for='item in contextMenuItems'
            @click='openDialog(item.title)'
            :class='`text-${item.color}`'
        )
            template(v-slot:prepend)
                v-icon.text--secondary(size='small') {{item.icon}}
            v-list-item-title {{$vuetify.locale.t(`$vuetify.${item.title}`)}}
//- confirm message dialog
confirmDialog(type='edit' confirmMessage='edit form')
confirmDialog(type='remove' confirmMessage='546')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";
// components
import confirmDialog from "./confirmDialog";

export default {
    props: ["ele"],
    setup() {
        // use groups data
        const customCardStore = useCustomCardStore();
        // return the store
        return { ...storeToRefs(customCardStore) };
    },
    components: { confirmDialog },
    methods: {
        openDialog(type) {
            this.contextMenu.dialog.show = true;
            this.contextMenu.dialog.type = type;
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
