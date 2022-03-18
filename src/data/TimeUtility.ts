import moment from "moment";

export function getLastDailyReset() {
    return moment().startOf('day').add(7, 'hour').utc()
}

export function getLastWeeklyReset() {
    return moment().startOf('week').add(4, 'day').add(7, 'hour').utc()
}

export function getNextDailyReset() {
    return getLastDailyReset().add(1, 'day').utc()
}

export function getNextWeeklyReset() {
    return getLastWeeklyReset().add(7, 'day').utc()
}