<template lang="pug">
v-dialog(
    v-if='contextMenu.dialog.type === type'
    v-model='contextMenu.dialog.show'
    max-width="570"
)
    v-card
        v-card-title {{$vuetify.locale.t(`$vuetify.${type}`)}}
        v-card-text
            slot
        //- v-card-text(v-if='customCardStore.dialog.type == "transport"')
            v-list(dense)
                v-list-item-group(v-model='selectedSubgroup' color='primary')
                    v-list-item(v-for='subgroup, i in contextmenu.subgroups' :key='i')
                        v-list-item-icon
                            v-icon f
                        v-list-item-content
                            v-list-item-title {{subgroup.title}}
        v-card-actions
            v-spacer
            v-btn(color='error' text @click='close') cancel
            v-btn(color='blue' @click='action' :loading='confirmDialogLoading') {{contextMenu.dialog.type}}
</template>
<script>
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";

export default {
    props: ["type", "action"],
    setup() {
        // use groups data
        const customCardStore = useCustomCardStore();
        // return the store
        return { ...storeToRefs(customCardStore) };
    },
    methods: {
        close() {
            this.contextMenu.dialog.show = false;
            this.contextMenu.type = "";
            this.contextMenu.entity = {};
            this.contextMenu.subgroups = [];
        },
    },
};
</script>
