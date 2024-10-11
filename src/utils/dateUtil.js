import moment from "moment";

const today = moment();

function getFormattedDate(date, dateFormat) {
    return moment(date).format(dateFormat);
}

function getTodayWithFormattedDate(dateFormat) {
    return getFormattedDate(today, dateFormat);
}

export default {
    getFormattedDate,
    getTodayWithFormattedDate
};