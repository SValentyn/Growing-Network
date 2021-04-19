import {
    FRIEND_TAB_SELECTED,
    FRIEND_REQUEST_TAB_SELECTED,
    PHOTOS_TAB_SELECTED,
    TAB_CHANGED,
    TAB_RESET
} from '../utils/constants/actionConstants'

const initialState = {
    selectedTab: 'timeline'
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case TAB_RESET:
            return {...state, selectedTab: 'timeline'}

        case FRIEND_TAB_SELECTED:
            return {...state, selectedTab: 'friends'}

        case FRIEND_REQUEST_TAB_SELECTED:
            return {...state, selectedTab: 'friend requests'}

        case PHOTOS_TAB_SELECTED:
            return {...state, selectedTab: 'photos'}
            
        case TAB_CHANGED:
            return {...state, selectedTab: payload}

        default:
            return {...state}
    }
}
