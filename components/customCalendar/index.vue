<template lang="pug">
v-container
    v-row.px-7.py-4(v-text='currentDate')
    v-row.py-4
        v-col.text-center(v-for='day in weekDays') {{day}}
    v-sheet
        v-row.ma-0(v-for='week in weeksList')
            v-col.calendar-day.py-5.text-center(
                v-for='day in week'
            )
                v-row
                    v-col.calendar-day_label
                        v-btn.calendar-add(
                            position='absolute' flat
                            location='left' icon
                            @click=''
                        ) #[v-icon mdi-plus]
                        v-btn.calendar-day__date(
                            :color='day.isToday ? "blue" : ""'
                            :variant="day.isToday ? 'flat' : 'text'" 
                            size='small' flat icon 
                            :ripple='false'
                            :disabled='day.inactive'
                        ) {{formatter(day.date, {month: day.day == 1, day: true})}}
                v-card.calendar-event(
                    v-for='event in dayEvents(day)'
                    @click='editEvent(event)'
                    :color='event.color'
                )
                    v-card-text {{event.name}}
</template>
<script>
// stores
import { storeToRefs } from "pinia";
import { useCalendarStore } from "~/store/calendar";
// function
import { renderCalendar } from "~/static/js/calender.js";
import { extractISODate } from "~/static/js/extractISODate";

export default {
    setup() {
        const calendarStore = useCalendarStore();
        return { ...storeToRefs(calendarStore) };
    },
    props: {
        updateEvents: Function,
        editEvent: Function,
        eventsVar: { default: "events" },
    },
    mounted() {
        const { currentDate, weeksList } = renderCalendar();
        this.currentDate = currentDate;
        this.weeksList = weeksList;
        this.updateEvents();
        console.log({ events: this[this.eventsVar], weeksList });
    },
    data: () => ({
        currentDate: "",
        weeksList: [],
    }),
    computed: {
        weekDays() {
            return JSON.parse(this.$vuetify.locale.t("$vuetify.weekDays"));
        },
    },
    methods: {
        dayEvents(day) {
            // if (!day.inactive) {
            return this[this.eventsVar].filter((event) => {
                const dayDate =
                    day.date.getTime() -
                    new Date().getTimezoneOffset() * 60 * 1000;
                return event.start === extractISODate({ date: dayDate });
            });
            // }
        },
        // formatter
        formatter(date, { year, month, day } = {}) {
            const lang = this.$vuetify.locale?.current;
            // options
            let options = {};
            if (year) options.year = "numeric";
            if (month) options.month = "long";
            if (day) options.day = "numeric";
            // format date
            const formatter = new Intl.DateTimeFormat(lang, options);
            return formatter.format(new Date(date));
        },
    },
};
</script>

<style lang="sass">
.calendar-day
    border: 1px solid #ffffff30
    .calendar-day_label
        position: relative
        .calendar-day__date .v-btn__overlay, .calendar-add
            display: none
            opacity: 0
            transition: opacity 0.3s ease
    &:hover .calendar-add
        display: block
        opacity: 1
    .calendar-event
        height: auto !important
        margin: 10px 0 !important
        padding: 10px
        white-space: break-spaces !important
        &.v-sheet
            width: 95%
            border: 2px green solid
            background: none
</style>
