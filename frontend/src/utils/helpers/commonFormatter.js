import {get} from 'lodash'
import {getAvatarLink} from './imageHelper'

export const getFullName = (user) => {
    return `${get(user, 'firstName', '')} ${get(user, 'lastName', '')}`
}

export const getFirstChar = (string) => {
    return string.charAt(0).toUpperCase()
}

export const getFirstChars = (user) => {
    return `${getFirstChar(get(user, 'firstName', ''))}${getFirstChar(get(user, 'lastName', ''))}`
}

export const getAvatarColorHex = (user) => {
    if (getAvatarLink(user) === null) {
        return `${get(user, 'avatarColorHex', '')}`
    }
    return '#ffffff00'
}
