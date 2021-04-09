import {FRIEND_REQUEST_TAB_SELECTED, TAB_CHANGED, TAB_RESET} from '../utils/constants/actionConstants'

const initialState = {
    selectedTab: 'timeline'
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case TAB_RESET:
            return {...state, selectedTab: 'timeline'}

        case FRIEND_REQUEST_TAB_SELECTED:
            return {...state, selectedTab: 'friend requests'}

        case TAB_CHANGED:
            return {...state, selectedTab: payload}

        default:
            return {...state}
    }
}
