<template lang="pug">
v-dialog(
    v-model='dialog'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize {{$vuetify.locale.t('$vuetify.createGroup')}}
        v-card-text
            v-container
                v-row
                    v-col(cols=12)
                        v-text-field(
                            v-model='title'
                            variant='outlined'
                            :rules="[requiredRole]"
                            :label="$vuetify.locale.t('$vuetify.name')"
                        )
                    v-col(cols=12)
                        v-textarea(
                            v-model='description'
                            variant='outlined'
                            rows=3
                            :label="$vuetify.locale.t('$vuetify.description')"
                        )
                btn-toggle-row(
                    title='$vuetify.workingDays'
                    selectedVar='add_group_days_selected'
                    :each='days'
                    :translate='false'
                    color="cyan darken-3"
                    multiple
                )
        v-card-actions
            v-spacer
            v-btn(color='red darken-1' text @click='close(false)') 
                | {{$vuetify.locale.t("$vuetify.cancel")}}
            v-btn(
                @click='create'
                color='blue darken-1' text
                :loading='loading'
                :disabled='valid'
            ) {{$vuetify.locale.t(`$vuetify.create`)}}

</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useCreateGroupStore } from "~/store/admin/createGroup";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
// components
import btnToggleRow from "~/components/forms/pieces/btnToggleRow";

export default {
    components: { btnToggleRow },
    setup() {
        const createGroupStore = useCreateGroupStore();
        const selectedVarsStore = useSelectedVarsStore();
        return {
            createGroupStore,
            ...storeToRefs(createGroupStore),
            ...storeToRefs(selectedVarsStore),
        };
    },
    data: () => ({
        title: "",
        description: "",
    }),
    computed: {
        days() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDays"));
        },
    },
    methods: {
        create() {
            this.createGroupStore.createGroup({
                title: this.title,
                description: this.description,
                working_days: this.add_group_days_selected,
            });
        },
    },
};
</script>
