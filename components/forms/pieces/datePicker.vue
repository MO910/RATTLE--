<template lang="pug">
v-overlay.datePickerOverlay(v-model="overlay" persistent :scrim='false')
Datepicker(
    v-model='selected'
    :enable-time-picker="false"

    :locale="$vuetify.locale.current"
    :cancelText="$vuetify.locale.t('$vuetify.cancel')"
    :selectText="$vuetify.locale.t('$vuetify.select')"
    :day-names="weekDaysShort"
    
    :dark='$vuetify.theme.current.dark'
    calendar-cell-class-name="custom-cell"
    menu-class-name="custom-menu"
    teleport-center

    @open="overlay = true"
    @closed="overlay = false"
)
    template(#trigger)
        v-btn(:color='color' flat)
            v-icon mdi-calendar
            span.mx-3 {{dateStyled}}
</template>

<script>
// Stores
import { useDatesStore } from "~/store/forms/dates";
import { storeToRefs } from "pinia";
// components
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// Functions
import { extractISODate } from "~/static/js/extractISODate";

export default {
    props: {
        selectedVar: { default: "globalDate" },
        color: { default: "blue" },
        historyAction: Function,
        historyParams: Object,
    },
    setup() {
        // use stores data
        const datesStore = useDatesStore();
        // return the store
        return { ...storeToRefs(datesStore) };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
        selected: new Date(),
        text: null,
    }),
    // update store value when select
    watch: {
        selected(date) {
            // update store value
            this[this.selectedVar] = extractISODate({ date });
            this.getHistory(date);
            return date;
        },
    },
    mounted() {
        this.selected = this[this.selectedVar] || new Date();
        this.getHistory(this.selected);
    },
    components: { Datepicker },
    computed: {
        weekDaysShort() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDaysShort"));
        },
        dateStyled() {
            let lang = this.$vuetify.locale.current == "en" ? "en-GB" : "ar-EG";
            const options = { dateStyle: "full", numberingSystem: "latn" },
                formatter = new Intl.DateTimeFormat(lang, options);
            return formatter.format(new Date(this.selected));
        },
    },
    methods: {
        // get history
        async getHistory(newDate) {
            if (!this.historyAction) return;
            this.fetching = true;
            // style the date to from
            let date = extractISODate({ date: newDate });
            // do action
            await this.historyAction({
                ...this.historyParams,
                date,
                // date: this.datePicker.selectedDate,
            });
            this.fetching = false;
        },
    },
};
</script>

<style lang="sass">
.custom-cell
    border-radius: 50%
.custom-menu
    transition: all 0.3 ease
.v-overlay.datePickerOverlay
    pointer-events: all
    backdrop-filter: blur(3px)
</style>
