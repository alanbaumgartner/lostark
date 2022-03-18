import moment from "moment";

export function getLastDailyReset() {
    return moment().utc().startOf('day').add(10, 'hour')
}

export function getLastWeeklyReset() {
    return moment().utc().startOf('week').add(4, 'day').add(10, 'hour')
}

export function getNextDailyReset() {
    return getLastDailyReset().add(1, 'day')
}

export function getNextWeeklyReset() {
    return getLastWeeklyReset().add(7, 'day')
}