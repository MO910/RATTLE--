<template lang="pug">
v-menu(
    v-model='contextMenu.show'
    @update:modelValue='updateModel'
    content-class='contextMenu'
    transition="scroll-y-transition" eager
)
    v-list(width='200')
        v-list-item(
            v-for='item in contextMenuItems'
            @click='openDialog(item)'
            :class='`text-${item.color}`'
        )
            template(v-slot:prepend)
                v-icon.text--secondary(size='small') {{item.icon}}
            v-list-item-title {{$vuetify.locale.t(`$vuetify.${item.title}`)}}
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";
// components
import confirmDialog from "./confirmDialog";

export default {
    setup() {
        const customCardStore = useCustomCardStore();
        // return the store
        return { ...storeToRefs(customCardStore) };
    },
    mounted() {
        // console.log(this.ele);
    },
    components: { confirmDialog },
    methods: {
        openDialog({ title, openAction }) {
            this.contextMenu.dialog.show = true;
            this.contextMenu.dialog.type = title;
            // apply open action
            if (openAction) openAction();
        },
        updateModel(val) {
            this.contextMenu.show = val;
            if (val || this.contextMenu.dialog.show) return;
            setTimeout(() => {
                this.contextMenu.type = "";
                this.contextMenu.entity = {};
            }, 500);
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
