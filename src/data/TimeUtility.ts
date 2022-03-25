import moment from "moment";

export function getNextWeeklyReset() {
    const thursdayIndex = 4; // for Thursday
    const todayIndex = moment().isoWeekday();

    if (todayIndex <= thursdayIndex && moment().utc().hour() < 10) {
        return moment().utc().isoWeekday(thursdayIndex).add(10, 'hour');
    } else {
        return moment().utc().add(1, 'weeks').isoWeekday(thursdayIndex).add(10, 'hour');
    }
}

export function getLastWeeklyReset() {
    return getNextWeeklyReset().subtract(7, 'day')
}

export function getNextDailyReset() {
    let today = moment().utc()
    if (today.hour() < 10) {
        return today.startOf('day').add(10, 'hour');
    } else {
        return today.startOf('day').add(1, 'day').add(10, 'hour');
    }
}

export function getLastDailyReset() {
    return getNextDailyReset().subtract(1, 'day')
}