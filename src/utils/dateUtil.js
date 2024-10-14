import moment from "moment";

const today = moment();

function getFormattedDate(date, dateFormat) {
    return moment(date).format(dateFormat);
}

function getTodayWithFormattedDate(dateFormat) {
    return getFormattedDate(today, dateFormat);
}

function getTimeOfDay(){
    const hour = parseInt(today.hours());
    let timeOfDay;
    if (hour >= 7 && hour < 12) {
        timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }
    return timeOfDay;
}

export default {
    getFormattedDate,
    getTodayWithFormattedDate,
    getTimeOfDay
};