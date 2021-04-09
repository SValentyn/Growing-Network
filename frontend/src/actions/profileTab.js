import {FRIEND_REQUEST_TAB_SELECTED, TAB_CHANGED, TAB_RESET} from '../utils/constants/actionConstants'

export const resetTab = () => dispatch => {
    dispatch({
        type: TAB_RESET
    })
}

export const selectFriendRequestTab = () => dispatch => {
    dispatch({
        type: FRIEND_REQUEST_TAB_SELECTED
    })
}

export const changeTab = value => dispatch => {
    dispatch({
        type: TAB_CHANGED,
        payload: value
    })
}
