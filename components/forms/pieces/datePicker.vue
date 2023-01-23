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
        v-btn(:color='color')
            v-icon mdi-calendar
            span.mx-3 {{dateStyled}}
</template>

<script>
import { useDatesStore } from "~/store/forms/dates";
import { storeToRefs } from "pinia";
//
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    props: {
        selectedVar: { type: String, default: "globalDate" },
        color: { type: String, default: "primary" },
    },
    async setup() {
        // use stores data
        const datesStore = useDatesStore();
        // return the store
        return { ...storeToRefs(datesStore) };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
        selected: "2022-11-30",
    }),
    // update store value when select
    watch: {
        selected(val) {
            // update store value
            this[this.selectedVar] = val;
            return val;
        },
    },
    mounted() {
        this.selected = new Date();
    },
    components: { Datepicker },
    computed: {
        weekDaysShort() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDaysShort"));
        },
        dateStyled() {
            // if (!this.plansOfDate.length) return;
            let lang = this.$vuetify.locale.current == "en" ? "en-GB" : "ar-EG";
            const options = { dateStyle: "full", numberingSystem: "latn" },
                formatter = new Intl.DateTimeFormat(lang, options);
            return formatter.format(new Date(this.selected));
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
