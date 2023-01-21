<template lang="pug">
v-dialog(width="570" :persistent='loading')
    template(v-slot:activator="{ props }")
        v-btn(v-bind="props" icon='mdi-plus')
    v-card
        v-card-title.text-h5.text-capitalize.d-inline-block {{$vuetify.locale.t('$vuetify.addPlan')}}
        //- color picker
        color-picker(:colors='colors' selectedVar='color')
        //- text field
        v-card-text
            v-form(:disabled='loading')
                //- select plan type
                btn-toggle-row(
                    title='$vuetify.type'
                    selectedVar='type'
                    :each='types'
                )
                //- select plan direction
                btn-toggle-row(
                    title='$vuetify.direction'
                    selectedVar='direction'
                    :each='directions'
                )
                //- select surah
                select-with-search(
                    :label="$vuetify.locale.t('$vuetify.surah')"
                    selectedVar='surahIndex'
                    :items='surahsNames'
                )
                //- 
                inputNumber(
                    model='addPlanForm.ayahValue'
                    key='ayahValue'
                    id_key='ayahValue'
                    :digitWidth='5'
                    :min='1'
                    :max='10'
                    :init='1'
                )
</template>

<script>
// store
import { useAddPlanStore } from "~/store/forms/addPlan";
import { storeToRefs } from "pinia";
// components
import colorPicker from "~/components/forms/pieces/colorPicker";
import btnToggleRow from "~/components/forms/pieces/btnToggleRow";
import selectWithSearch from "~/components/forms/pieces/selectWithSearch";
import inputNumber from "~/components/forms/pieces/inputNumber";

export default {
    components: { colorPicker, btnToggleRow, selectWithSearch, inputNumber },
    async setup() {
        // use store data
        const addPlanStore = useAddPlanStore();
        return { ...storeToRefs(addPlanStore) };
    },
};
</script>
