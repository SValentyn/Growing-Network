import {
    FRIEND_REQUEST_TAB_SELECTED,
    FRIEND_TAB_SELECTED,
    PHOTOS_TAB_SELECTED,
    TAB_CHANGED,
    TAB_RESET,
} from '../utils/constants/actionConstants'

export const resetTab = () => (dispatch) => {
    dispatch({
        type: TAB_RESET
    })
}

export const selectFriendsTab = () => (dispatch) => {
    dispatch({
        type: FRIEND_TAB_SELECTED
    })
}

export const selectFriendRequestsTab = () => (dispatch) => {
    dispatch({
        type: FRIEND_REQUEST_TAB_SELECTED
    })
}

export const selectPhotosTab = () => (dispatch) => {
    dispatch({
        type: PHOTOS_TAB_SELECTED
    })
}

export const changeTab = value => (dispatch) => {
    dispatch({
        type: TAB_CHANGED,
        payload: value
    })
}
