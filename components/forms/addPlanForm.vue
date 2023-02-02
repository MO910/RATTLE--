<template lang="pug">
v-btn(
    @click='dialog = true'
    icon='mdi-plus'
)
v-dialog(
    width="570"
    v-model='dialog'
    :persistent='loading'
    transition="scale-transition"
)
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
                //- select ayah value
                v-row
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.from')}} {{$vuetify.locale.t('$vuetify.ayah')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='ayahValue'
                            :max='10'
                            :init='ayahValue || 1'
                        )
                        inputNumber(
                            model='ayahValue'
                            key='ayahValue'
                            id_key='ayahValue'
                            :digitWidth='5'
                            :min='1'
                            :max='10'
                            :init='ayahValue || 1'
                        )
                //- select pages per day
                v-row
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.pagesPerDay')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='pagesValue'
                            :max='10'
                            :init='pagesValue || 1'
                        )
                //- week number
                v-row
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.weeks')}}:
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='weeks'
                            :max='10'
                            :init='pagesValue || 1'
                        )
                //- rabt
                v-row
                    v-col(cols='12')
                        v-divider
                    v-col.text-h6(cols='12')
                        v-switch(
                            v-model="has_rabt"
                            :label="$vuetify.locale.t('$vuetify.hasRabt')"
                        )
                v-row(v-if='has_rabt')
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.rabtPages')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='rabtPagesValue'
                            :max='10'
                            :init='rabtPagesValue || 1'
                        )
                //- select days
                v-row
                    v-col(cols='12')
                        v-divider
                btn-toggle-row(
                    title='$vuetify.workingDays'
                    selectedVar='days_selected'
                    :each='days'
                    :translate='false'
                    color="cyan darken-3"
                    multiple
                )
                //- starting day
                v-row
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.startingDate')}}
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        date-picker(selectedVar='startingDate')
        v-card-actions
            v-spacer
            v-btn(
                color='error' text
                @click='close' :disabled='loading'
            ) {{$vuetify.locale.t('$vuetify.cancel')}}
            v-btn(
                color='primary'
                @click='add' :loading='loading'
            ) {{$vuetify.locale.t('$vuetify.add')}}
</template>

<script>
// store
import { useAddPlanStore } from "~/store/forms/addPlan";
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useQuranStore } from "~/store/quran";
import { storeToRefs } from "pinia";
// components
import colorPicker from "~/components/forms/pieces/colorPicker";
import btnToggleRow from "~/components/forms/pieces/btnToggleRow";
import selectWithSearch from "~/components/forms/pieces/selectWithSearch";
import inputNumber from "~/components/forms/pieces/inputNumber";
import datePicker from "~/components/forms/pieces/datePicker";

export default {
    components: {
        colorPicker,
        btnToggleRow,
        selectWithSearch,
        inputNumber,
        datePicker,
    },
    props: ["default_days", "subgroup_id", "group", "isStudent"],
    async setup() {
        // use store data
        const addPlanStore = useAddPlanStore();
        const inputNumberStore = useInputNumberStore();
        const selectedVarsStore = useSelectedVarsStore();
        const quranStore = useQuranStore();
        return {
            addPlanStore,
            inputNumberStore,
            selectedVarsStore,
            ...storeToRefs(quranStore),
            ...storeToRefs(addPlanStore),
            ...storeToRefs(inputNumberStore),
            ...storeToRefs(selectedVarsStore),
        };
    },
    data: () => ({ hasRabt: false }),
    mounted() {
        this.days_selected = this.default_days;
    },
    computed: {
        days() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDays"));
        },
    },
    methods: {
        async add() {
            this.addPlanStore.loading = true;
            // do add
            await this.addPlanStore.addPlan({
                group: this.group,
                subgroup_id: this.subgroup_id,
                isStudent: this.isStudent,
            });
            // close and reset the store
            this.close();
        },
        close() {
            // this.addPlanStore.loading = false;
            // this.addPlanStore.dialog = false;
            this.addPlanStore.$reset();
            this.selectedVarsStore.$reset();
            this.inputNumberStore.$reset();
        },
    },
};
</script>
