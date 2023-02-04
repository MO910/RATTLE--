<template lang="pug">
v-container
    v-row
        v-col.v-col-auto.d-flex
            .align-self-center {{formatter(currentDate, {month: true, year: true})}}
        v-col.d-flex
            v-switch.align-self-center(
                v-model='showAll'
                size='x-small'
                label="Show All" inset
            )
        v-col.d-flex.justify-end
            v-btn.px-0(variant='text' @click='navigate("right")')
                v-icon(color='grey-lighten-1' size="x-large") mdi-chevron-right
            v-btn(variant='text' @click='navigate("today")') {{$vuetify.locale.t("$vuetify.today")}}
            v-btn.px-0(variant='text' @click='navigate("left")')
                v-icon(color='grey-lighten-1' size="x-large") mdi-chevron-left
    v-row.py-4
        v-col.text-center(v-for='day in weekDays') {{day}}
    v-sheet
        v-row.ma-0(v-for='week in visibleWeeksList')
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
                    v-card-text.text-start {{event.name}}
</template>
<script>
// stores
import { storeToRefs } from "pinia";
import { useCalendarStore } from "~/store/calendar";
// function
import calenderDays from "~/static/js/calender.js";
import { extractISODate } from "~/static/js/extractISODate";

export default {
    setup() {
        const calendarStore = useCalendarStore();
        return { ...storeToRefs(calendarStore) };
    },
    props: {
        updateEvents: Function,
        editEvent: Function,
        groupWorkingDays: Array,
        eventsVar: { default: "events" },
    },
    mounted() {
        this.initMonth();
    },
    data: () => ({
        currentDate: new Date(),
        currentMonth: "",
        weeksList: [],
        showAll: true,
    }),
    computed: {
        weekDays() {
            let allDays = JSON.parse(
                this.$vuetify.locale.t("$vuetify.weekDays")
            );
            if (this.showAll) return allDays;
            return allDays.filter((_, i) => this.groupWorkingDays.includes(i));
        },
        visibleWeeksList() {
            if (this.showAll) return this.weeksList;
            return this.weeksList.map((week) =>
                week.filter((_, i) => this.groupWorkingDays.includes(i))
            );
        },
    },
    methods: {
        initMonth() {
            const weeksList = calenderDays(this.currentDate);
            this.weeksList = weeksList;
            this.updateEvents();
        },
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
        // month swapping
        navigate(direction) {
            let dateAfterNav;
            if (direction === "today")
                this.currentDate = dateAfterNav = new Date();
            else {
                let langDirection =
                        this.$vuetify.locale.current === "en" ? 1 : -1,
                    magnitude = direction === "right" ? 1 : -1,
                    newMonth =
                        this.currentDate.getMonth() + magnitude * langDirection;
                dateAfterNav = this.currentDate.setMonth(newMonth);
            }
            this.currentDate = new Date(dateAfterNav);
            // recalculate
            this.initMonth();
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
