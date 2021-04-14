import moment from 'moment'

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

export const getActiveTime = (dateMilliseconds) => {
    let minuteDifference = Math.floor((new Date().getTime() - dateMilliseconds) / 60000)

    if (minuteDifference === 0) {
        return 'just now'
    } else if (minuteDifference === 1) {
        return 'a ' + minuteDifference + ' minute ago'
    } else {
        return minuteDifference + ' minutes ago'
    }
}
