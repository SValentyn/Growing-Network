import {get} from 'lodash'

export const getFullName = (user) => {
    return `${get(user, 'firstName', '')} ${get(user, 'lastName', '')}`
}
