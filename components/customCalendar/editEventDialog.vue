<template lang="pug">
v-dialog(
    width="570"
    v-model='eventForm.dialog'
    @update:modelValue='close'
    :persistent='removeLoading || editLoading'
    transition="scale-transition"
)
    v-card
        v-card-title.text-h5.text-capitalize.d-inline-block
            span {{$vuetify.locale.t(`$vuetify.${eventForm.edit ? 'edit' : 'add'}`)}}
        //- other fields
        v-card-text
            v-form(:disabled='disabled')
                v-row
                    //- from surah
                    v-col(cols='12' v-if='!eventForm.edit')
                        select-with-search(
                            :label='this.$vuetify.locale.t("$vuetify.plan")'
                            selectedVar='toPlanIndex' 
                            :items='subgroup.plans'
                            itemTitle='title'
                            itemValue='id'
                            enableSearch=false
                        )
                    //- select date
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.date')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        date-picker(selectedVar='editEventDate' color)
                    //- from surah
                    v-col(cols='12')
                        select-with-search(
                            :label="surahD('from')"
                            selectedVar='fromSurahIndex' 
                            :items='surahsNames'
                        )
                    //- from ayah
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{ayahD('from')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='fromAyah'
                            :max='eventForm.form.maxFrom'
                            :init='fromAyah || 1'
                        )
                    //- to surah
                    v-col(cols='12')
                        select-with-search(
                            :label="surahD('to')"
                            selectedVar='toSurahIndex' 
                            :items='surahsNames'
                        )
                    //- to ayah
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{ayahD('to')}}
                    v-col.d-flex.justify-end.align-center(cols='6')
                        inputNumber(
                            model='toAyah'
                            :max='eventForm.form.maxTo'
                            :init='toAyah || 1'
                        )
            v-card-actions
                v-spacer
                v-btn(color='error' text @click='close') {{$vuetify.locale.t('$vuetify.cancel')}}
                template(v-if='eventForm.edit')
                    v-btn(
                        color='error'
                        @click='edit(true)' :loading='removeLoading'
                    ) {{$vuetify.locale.t('$vuetify.remove')}}
                    v-btn(
                        color='primary'
                        @click='edit(false)'
                        :loading='editLoading'
                    ) {{$vuetify.locale.t('$vuetify.edit')}}
                v-btn(
                    v-else
                    color='blue'
                    @click='add' :loading='addLoading'
                ) {{$vuetify.locale.t('$vuetify.add')}}
</template>
<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";
import { useCalendarStore } from "~/store/calendar";
import { useQuranStore } from "~/store/quran";
import { useSelectedVarsStore } from "~/store/forms/selectedVars";
import { useInputNumberStore } from "~/store/forms/inputNumber";
import { useDatesStore } from "~/store/forms/dates";
// components
import selectWithSearch from "~/components/forms/pieces/selectWithSearch";
import inputNumber from "~/components/forms/pieces/inputNumber";
import datePicker from "~/components/forms/pieces/datePicker";

export default {
    props: ["isStudent", "subgroup", "update"],
    components: { selectWithSearch, inputNumber, datePicker },
    setup() {
        // use stores data
        const groupsStore = useGroupsStore();
        const calendarStore = useCalendarStore();
        const quranStore = useQuranStore();
        const selectedVarsStore = useSelectedVarsStore();
        const inputNumberStore = useInputNumberStore();
        const datesStore = useDatesStore();
        return {
            calendarStore,
            groupsStore,
            ...storeToRefs(calendarStore),
            ...storeToRefs(quranStore),
            ...storeToRefs(selectedVarsStore),
            ...storeToRefs(inputNumberStore),
            ...storeToRefs(datesStore),
        };
    },
    data: () => ({
        removeLoading: false,
        editLoading: false,
    }),
    computed: {},
    methods: {
        // translate
        surahD(end) {
            return `${this.$vuetify.locale.t(
                "$vuetify." + end
            )} ${this.$vuetify.locale.t("$vuetify.surah")}`;
        },
        ayahD(end = "from") {
            return `${this.$vuetify.locale.t(
                "$vuetify." + end
            )} ${this.$vuetify.locale.t("$vuetify.ayah")}`;
        },
        // close dialog
        close(model) {
            if (model === true) return;
            this.calendarStore.resetEventForm();
            this.eventForm.dialog = false;
        },
        // edit
        async edit(remove) {
            // start loading
            if (remove) this.removeLoading = true;
            else this.editLoading = true;
            this.disabled = true;
            // fill the request object
            let reqObj = {
                custom_plan_id: this.eventForm.data.id,
                tree: this.isStudent
                    ? ["groups", "floatingStudents", "plans", "custom_plans"]
                    : [
                          "groups",
                          "courses",
                          "subgroups",
                          "plans",
                          "custom_plans",
                      ],
            };
            if (!remove) {
                const from = `${this.fromSurahIndex + 1}:${this.fromAyah}`,
                    to = `${this.toSurahIndex + 1}:${this.toAyah}`,
                    date = new Date(this.editEventDate).getTime();
                reqObj.newData = {
                    from,
                    to,
                    date: date + "",
                };
            }
            // do action
            await this.calendarStore.editCustomPlan(reqObj);
            // close the dialog
            this.close();
            // update the events
            this.update();
            // end loading
            this.removeLoading = false;
            this.editLoading = false;
            this.disabled = false;
        },
    },
};
</script>
