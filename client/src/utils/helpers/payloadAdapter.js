import {some, unionBy} from 'lodash'

export const addPagedPayload = (currentArray, incomingArray, comparingKey) => {
    return unionBy(currentArray, incomingArray, comparingKey)
}

export const addPayloadIfNotInStore = (currentArray, incomingItem, comparingKey) => {
    let result = []

    if (some(currentArray, {[comparingKey]: incomingItem[comparingKey]})) {
        result = [...currentArray]
    } else {
        result = [...currentArray, incomingItem]
    }

    return result
}
