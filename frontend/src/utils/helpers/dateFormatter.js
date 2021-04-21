import moment from 'moment'

const LAST_THRESHOLD_OF_ONLINE_ACTIVITY = 15

export const dateFormatter = (dateMilliseconds) => {
    return moment(dateMilliseconds).format('Do MMM YYYY [at] LT')
}

export const getDateWithoutTime = (dateMilliseconds) => {
    return moment(dateMilliseconds).format('Do MMM YYYY')
}

export const getDateForChat = (dateMilliseconds) => {
    return moment(dateMilliseconds).isSame(moment(), 'day')
        ? moment(dateMilliseconds).format('LT')
        : moment(dateMilliseconds).fromNow()
}

export const getLastActiveTime = (dateMilliseconds) => {
    let minuteDifference = getMinuteDifference(dateMilliseconds)
    if (minuteDifference === 0.0) {
        return 'online'
    } else if (minuteDifference <= 1.0) {
        return 'a ' + minuteDifference + ' minute ago'
    } else if (minuteDifference <= LAST_THRESHOLD_OF_ONLINE_ACTIVITY) {
        return minuteDifference + ' minutes ago'
    } else {
        return 'offline'
    }
}

export const getMinuteDifference = (dateMilliseconds) => {
    return Math.abs(Math.floor((new Date().getTime() - dateMilliseconds) / 60000.0))
}
