<template lang="pug">
v-dialog(
    width="570"
    v-model='eventForm.dialog'
    :persistent='loading'
    transition="scale-transition"
)
    v-card
        v-card-title.text-h5.text-capitalize.d-inline-block
            span {{$vuetify.locale.t(`$vuetify.${eventForm.edit ? 'edit' : 'add'}`)}}
        v-card-text
            v-form(:disabled='disabled')
                v-row
                    //- select date
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        | {{$vuetify.locale.t('$vuetify.date')}}
                    v-col.d-flex.justify-start.align-center.text-h6(cols='6')
                        //- v-menu(transition='scroll-y-transition' offset-y)
                            template(v-slot:activator='{ on, attrs }')
                                v-btn.text-right(v-bind='attrs' v-on='on' text block) {{eventForm.form.date}}
                            //- v-date-picker(:value='eventForm.form.date' @change='changeDate')
                    //- from surah
                    v-col(cols='12')
                        select-with-search(
                            :label="surahD('from')"
                            selectedVar='surahIndex'
                            :items='surahsNames'
                        )
                        //- select-surah(
                        //-     :label="surahD('from')"
                        //-     :value='eventForm.form.fromSurahIndex'
                        //-     :direction_selected='direction_selected'
                        //-     type='from'
                        //- )
</template>
<script>
// stores
import { storeToRefs } from "pinia";
import { useCalendarStore } from "~/store/calendar";
import { useQuranStore } from "~/store/quran";
// components
import selectWithSearch from "~/components/forms/pieces/selectWithSearch";

export default {
    props: ["isStudent", "update"],
    components: { selectWithSearch },
    setup() {
        const calendarStore = useCalendarStore();
        const quranStore = useQuranStore();
        return { ...storeToRefs(calendarStore), ...storeToRefs(quranStore) };
    },
    data: () => ({ dialog: true }),
    methods: {
        // translate
        surahD(end) {
            return `${this.$vuetify.locale.t(
                "$vuetify." + end
            )} ${this.$vuetify.locale.t("$vuetify.surah")}`;
        },
    },
};
</script>
