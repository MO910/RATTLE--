<template lang="pug">
v-row
    //- v-col(cols='4')
    //-     v-card-text {{verseName}}
    | {{amount_done}}
    v-col.d-flex.justify-end.align-center(cols='12')
        v-slider.align-center(
            @update:modelValue="changeAmount"
            v-model="amount_done"
            :label='verseName'
            step=1
            min=1
            :max='versesKeys.length'
            show-ticks
        )
    template(v-if='!disableRatting')
        v-col(cols='4')
            v-card-text {{$vuetify.locale.t("$vuetify.grade")}}: {{this.history && this.history.grade}} / 10
        v-col.d-flex.justify-end.align-center(cols='8')
            v-rating.d-flex.justify-space-between.align-center(
                @update:modelValue="changeRating"
                v-model="grade"
                background-color="grey"
                color="blue"
                hover
                half-increments
                density='comfortable'
            )
        v-col(cols='12' v-if='divider')
            v-divider
</template>

<script>
// Stores
import { useDatesStore } from "~/store/forms/dates";
import { useQuranStore } from "~/store/quran";
import { useGroupsStore } from "~/store/groups";
import { storeToRefs } from "pinia";
// Functions
import { verseKeyToName } from "~/static/js/stringify";
import { extractISODate } from "~/static/js/extractISODate";

export default {
    setup(props) {
        // use stores data
        const groupsStore = useGroupsStore();
        const datesStore = useDatesStore();
        const quranStore = useQuranStore();

        const datesStoreRefs = storeToRefs(datesStore);

        let historyIndex = ref(null),
            amount_done = ref(1),
            grade = ref(0);
        // history
        function history() {
            const historyFiltered =
                datesStoreRefs.selectedDateHistory?.value?.filter((h, i) => {
                    let date = extractISODate({ date: h.date, time: true }),
                        selectedDate = extractISODate({
                            date: datesStoreRefs.globalDate.value,
                            time: true,
                        });
                    let conditions =
                        date == selectedDate &&
                        h.plan_id == props.plan.id &&
                        h.student_id == props.student_id &&
                        h.custom_plan_id == props.plan.day.id;
                    if (conditions) {
                        historyIndex.value = i;
                        console.log({ historyIndex });
                    }

                    return conditions;
                })?.[0];
            return {
                get: historyFiltered,
                set: () => {
                    // update
                    amount_done.value =
                        historyFiltered?.amount_done || amount_done.value;
                    grade.value = historyFiltered?.grade || grade.value;
                    return historyFiltered;
                },
            };
        }

        // watch the store and update
        datesStore.$subscribe((mutation, state) => history().set());
        // return the store
        return {
            history,
            historyIndex,
            amount_done,
            grade,
            //
            groupsStore,
            ...datesStoreRefs,
            ...storeToRefs(quranStore),
        };
    },
    // mounted() {
    //     console.log("advantage", this.student_id, this.verseName);
    // },
    data: () => ({ ratingLength: 5 }),
    props: ["plan", "student_id", "divider"],
    computed: {
        // verse
        versesKeys() {
            const { from, to } = this.plan.day;
            const [fromSurah, fromAyah] = from.split(":");
            const [toSurah, toAyah] = to.split(":");
            let allVerses = [];
            // fill the array
            for (let surahI = fromSurah - 1; surahI < toSurah; surahI++) {
                let toInThisSurah =
                    surahI == toSurah - 1
                        ? toAyah
                        : this.surahAdj[surahI].verses_count;
                for (let ayahI = fromAyah - 1; ayahI < toInThisSurah; ayahI++)
                    allVerses.push(`${surahI + 1}:${ayahI + 1}`);
            }
            return allVerses;
        },
        verseName() {
            const currentVerse = this.versesKeys[this.amount_done - 1];
            return currentVerse && verseKeyToName(currentVerse, this);
        },
        disableRatting() {
            return this.amount_done < this.versesKeys.length;
        },
        // amount_done() {
        //     return this.history?.amount_done || 1;
        // },
        // ratingRatio() {
        //     return (this.history?.grade || 0) / 10;
        // },
    },
    methods: {
        updateHistoryWrapper(obj, key, locallyOnly) {
            obj = {
                student_id: this.student_id,
                plan_id: this.plan.id,
                custom_plan_id: this.plan.day.id,
                // default values
                amount_done: this.amount_done,
                grade: this.grade,
                // new value
                ...obj,
            };
            // console.log({ history: this.history().get });
            // console.log(this.selectedDateHistory, this.historyIndex, key);
            // update locally
            if (this.history().get)
                this.selectedDateHistory[this.historyIndex][key] = obj[key];
            else {
                this.historyIndex = this.selectedDateHistory.length;
                let date = extractISODate({ date: this.selectedDate });
                let newObj = {
                    ...obj,
                    date,
                };
                this.selectedDateHistory.push(newObj);
            }
            // update DB
            delete obj.plan_id;
            if (!locallyOnly) this.groupsStore.updatePlanHistory(obj);
        },
        // debounce update
        debounce(cb, delay = 1000) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(cb, delay);
        },
        // change sliders
        changeAmount(amount_done, locallyOnly) {
            this.debounce(() => {
                // update
                this.updateHistoryWrapper(
                    { amount_done },
                    "amount_done",
                    locallyOnly
                );
            });
        },
        changeRating(grade) {
            this.debounce(() => {
                // const grade = (n / this.ratingLength) * 10;
                // update
                this.updateHistoryWrapper({ grade }, "grade");
            });
        },
    },
};
</script>
