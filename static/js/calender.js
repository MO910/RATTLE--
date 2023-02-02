import { extractISODate } from "./extractISODate";
// storing full name of all months in array
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const renderCalendar = (date = new Date()) => {
    let currYear = date.getFullYear(),
        currMonth = date.getMonth(),
        // getting first day of month
        firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
        // getting last date of month
        lastDateOfMonth_Date = new Date(currYear, currMonth + 1, 0),
        lastDateOfMonth = lastDateOfMonth_Date.getDate(),
        // getting last day of month
        lastDayOfMonth_date = new Date(currYear, currMonth, lastDateOfMonth),
        lastDayOfMonth = lastDayOfMonth_date.getDay(),
        // getting next month
        nextMonth_date = new Date(
            lastDayOfMonth_date.setMonth(lastDayOfMonth_date.getMonth() + 1)
        ),
        // getting last date of previous month
        lastDateOfLastMonth_Date = new Date(currYear, currMonth, 0),
        lastDateOfLastMonth = lastDateOfLastMonth_Date.getDate(),
        // days list
        daysList = [];
    // console.log({
    //     firstDayOfMonth: new Date(currYear, currMonth, 1),
    //     lastDateOfLastMonth: new Date(currYear, currMonth, 0),
    // });
    // *creating li of previous month last days
    for (let i = firstDayOfMonth; i > 0; i--) {
        let day = lastDateOfLastMonth - i + 1,
            liDate = new Date(lastDateOfLastMonth_Date.setDate(day));
        daysList.push({
            day,
            date: liDate,
            inactive: true,
        });
    }
    // *creating li of all days of current month
    // for (let i = 1; i <= lastDateOfMonth; i++) {
    //     let last = new Date(daysList.at(-1).date),
    //         day = last.getDate();
    //     daysList.push({
    //         day,
    //         date: extractISODate({ date: last.setDate(day + 1) }),
    //         inactive: true,
    //     });
    // }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        // adding active class to li if the current day, month, and year matched
        let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear();
        // push to list
        let liDate = new Date(lastDateOfMonth_Date.setDate(i));
        daysList.push({ day: i, date: liDate, isToday: !!isToday });
    }
    // *creating li of next month first days
    for (let i = lastDayOfMonth; i < 6; i++) {
        let day = i - lastDayOfMonth + 1,
            liDate = new Date(nextMonth_date.setDate(day));
        daysList.push({ day, date: liDate, inactive: true });
    }
    // split to weeks
    const weeksList = [];
    while (daysList.length) weeksList.push(daysList.splice(0, 7));
    // return
    return {
        currentDate: `${months[currMonth]} ${currYear}`,
        weeksList,
    };
};
// renderCalendar();

// prevNextIcon.forEach((icon) => {
//     // getting prev and next icons
//     icon.addEventListener("click", () => {
//         // adding click event on both icons
//         // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//         currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
//         // if current month is less than 0 or greater than 11
//         // creating a new date of current year & month and pass it as date value
//         if (currMonth < 0 || currMonth > 11) {
//             date = new Date(currYear, currMonth, new Date().getDate());
//             currYear = date.getFullYear(); // updating current year with new date year
//             currMonth = date.getMonth(); // updating current month with new date month
//         }
//         // else pass the current date as date value
//         else date = new Date();
//         // calling renderCalendar function
//         renderCalendar();
//     });
// });
