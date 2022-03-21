import moment from "moment";

export function getLastDailyReset() {
    return moment().utc().startOf('day').add(10, 'hour')
}

export function getLastWeeklyReset() {
    return moment().utc().day(moment().day() >= 5 ? 5 :-3);
}

export function getNextDailyReset() {
    return getLastDailyReset().add(1, 'day')
}

export function getNextWeeklyReset() {
    return getLastWeeklyReset().add(7, 'day')
}