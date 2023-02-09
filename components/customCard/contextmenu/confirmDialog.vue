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
        v-card-actions
            v-spacer
            v-btn(color='error' text @click='close') {{$vuetify.locale.t('$vuetify.cancel')}}
            v-btn(color='blue' @click='action' :loading='confirmDialogLoading') {{$vuetify.locale.t(`$vuetify.${contextMenu.dialog.type}`)}}
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
        return { customCardStore, ...storeToRefs(customCardStore) };
    },
    methods: {
        close() {
            this.customCardStore.$reset();
        },
    },
};
</script>
