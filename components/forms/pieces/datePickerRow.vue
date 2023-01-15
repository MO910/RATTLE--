<template lang="pug">
v-overlay.datePickerOverlay(v-model="overlay" persistent :scrim='false')
v-row
    v-col(cols='1')
        Datepicker(
            v-model='datePicker.selectedDate'
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
                v-btn {{datePicker.selectedDate}}
</template>

<script>
import { useGroupsStore } from "~/store/groups";
import { useQuranStore } from "~/store/quran";
import { storeToRefs } from "pinia";
//
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    async setup() {
        // fetch user
        definePageMeta({ middleware: "fetch-user" });
        // use stores data
        const groupsStore = useGroupsStore();
        const quranStore = useQuranStore();
        // fetch groups
        await groupsStore.fetchGroups();
        // return the store
        return { ...storeToRefs(groupsStore), ...storeToRefs(quranStore) };
    },
    data: () => ({
        isStudent: null,
        overlay: false,
        datePicker: {
            fetching: false,
            selectedDate: "2022-11-30",
        },
    }),
    components: { Datepicker },
    methods: {},
    computed: {
        weekDaysShort() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDaysShort"));
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
    backdrop-filter: blur(3px)
</style>
