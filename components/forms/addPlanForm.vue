<template lang="pug">
v-dialog(width="570" :persistent='loading')
    template(v-slot:activator="{ props }")
        v-btn(v-bind="props" icon='mdi-plus')
    v-card
        v-card-title.text-h5.text-capitalize.d-inline-block {{$vuetify.locale.t('$vuetify.addPlan')}}
        //- color picker
        color-picker
        //- text field
        v-card-text
            v-form(:disabled='loading')
                btn-toggle-row(
                    title='$vuetify.type'
                    selectedVar='selectedType'
                    :each='types'
                )
                btn-toggle-row(
                    title='$vuetify.direction'
                    selectedVar='selectedDirection'
                    :each='directions'
                )
</template>

<script>
// store
import { useAddPlanStore } from "~/store/forms/addPlan";
import { storeToRefs } from "pinia";
// components
import colorPicker from "~/components/forms/pieces/colorPicker";
import btnToggleRow from "~/components/forms/pieces/btnToggleRow";

export default {
    components: { colorPicker, btnToggleRow },
    async setup() {
        // use store data
        const addPlanStore = useAddPlanStore();
        return { ...storeToRefs(addPlanStore) };
    },
};
</script>
