import moment from "moment";

const today = moment();

function getFormattedDate(dateFormat) {
    return today.format(dateFormat);
}

export default {
    getFormattedDate
};