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
            v-btn(color='blue' @click='doAction' :loading='confirmDialogLoading') {{$vuetify.locale.t(`$vuetify.${contextMenu.dialog.type}`)}}
</template>
<script>
import { storeToRefs } from "pinia";
import { useCustomCardStore } from "~/store/customCard";

export default {
    props: {
        type: String,
        action: Function,
        closeCondition: { default: true },
    },
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
        async doAction() {
            this.confirmDialogLoading = true;
            // do action
            await this.action();
            // stop loading and close dialog
            this.confirmDialogLoading = false;
            if (this.closeCondition) this.contextMenu.dialog.show = false;
        },
    },
};
</script>
