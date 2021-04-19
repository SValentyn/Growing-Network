import {
    ACTIVE_FRIENDS_RECEIVED,
    ACTIVE_FRIENDS_STARTED_LOADING,
    ACTIVE_FRIENDS_STOPPED_LOADING,
    CURRENT_USER_FRIENDS_RECEIVED,
    FRIEND_DELETED,
    FRIEND_SUGGESTIONS_RECEIVED,
    FRIEND_SUGGESTIONS_STARTED_LOADING,
    FRIEND_SUGGESTIONS_STOPPED_LOADING,
    FRIENDS_RECEIVED,
    FRIENDS_STARTED_LOADING,
    FRIENDS_STOPPED_LOADING,
    INCOMING_FRIEND_REQUESTS_RECEIVED,
    REQUEST_CONFIRMED,
    REQUEST_DELETED,
    RESET_ACTIVE_FRIENDS,
    RESET_FRIEND_SUGGESTIONS,
    RESET_FRIENDS
} from '../utils/constants/actionConstants'
import apiRequest from '../utils/helpers/apiRequest'
import {Toastr} from '../utils/toastr/Toastr'

export const loadUserFriends = (username, page, size, isInitialRequest) => async (dispatch) => {
    dispatch({
        type: FRIENDS_STARTED_LOADING
    })

    if (isInitialRequest) {
        dispatch({
            type: RESET_FRIENDS
        })
    }

    try {
        const friends = await apiRequest.get('/users/friends/' + username, {params: {page, size}})
        dispatch({
            type: FRIENDS_RECEIVED,
            payload: friends
        })
    } catch (e) {
        dispatch({
            type: FRIENDS_STOPPED_LOADING
        })
    }
}

export const loadCurrentUserFriends = (username, page, size) => async (dispatch) => {
    try {
        const friends = await apiRequest.get('/users/friends/' + username, {params: {page, size}})
        dispatch({
            type: CURRENT_USER_FRIENDS_RECEIVED,
            payload: friends
        })
    } catch (e) {
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const deleteFriend = (friendUsername) => async (dispatch) => {
    try {
        const deletedUser = await apiRequest.delete('/users/friends/' + friendUsername)
        dispatch({
            type: FRIEND_DELETED,
            payload: deletedUser
        })
    } catch (e) {
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const confirmRequest = (requestId) => async (dispatch) => {
    try {
        const newFriend = await apiRequest.put('/requests/' + requestId)
        dispatch({
            type: REQUEST_CONFIRMED,
            payload: newFriend
        })
    } catch (e) {
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const deleteRequest = (requestId) => async (dispatch) => {
    try {
        const requestList = await apiRequest.delete('/requests/' + requestId)
        dispatch({
            type: REQUEST_DELETED,
            payload: requestList
        })
    } catch (e) {
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const getFriendSuggestions = (size) => async (dispatch) => {
    dispatch({
        type: FRIEND_SUGGESTIONS_STARTED_LOADING
    })

    dispatch({
        type: RESET_FRIEND_SUGGESTIONS
    })

    try {
        const suggestions = await apiRequest.get('/users/friends/suggest', {params: {size}})
        dispatch({
            type: FRIEND_SUGGESTIONS_RECEIVED,
            payload: suggestions
        })
    } catch (e) {
        dispatch({
            type: FRIEND_SUGGESTIONS_STOPPED_LOADING
        })
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const sendFriendRequest = (responderId) => {
    return apiRequest.post(/requests/ + responderId)
}

export const getIncomingFriendRequests = () => async dispatch => {
    try {
        const requests = await apiRequest.get('/requests')
        dispatch({
            type: INCOMING_FRIEND_REQUESTS_RECEIVED,
            payload: requests
        })
    } catch (e) {
        Toastr.error('Something is wrong! Please try again later.')
    }
}

export const checkFriendshipStatus = (targetUsername) => {
    return apiRequest.get('/users/friends/status/' + targetUsername)
}

export const loadActiveFriends = (page, size, isInitialRequest) => async (dispatch) => {
    let pageable = {page, size}

    dispatch({
        type: ACTIVE_FRIENDS_STARTED_LOADING
    })

    if (isInitialRequest) {
        dispatch({
            type: RESET_ACTIVE_FRIENDS
        })
    }

    try {
        const activeFriends = await apiRequest.get('/users/friends/active', pageable)
        dispatch({
            type: ACTIVE_FRIENDS_RECEIVED,
            payload: activeFriends
        })
    } catch (e) {
        dispatch({
            type: ACTIVE_FRIENDS_STOPPED_LOADING
        })
    }
}
