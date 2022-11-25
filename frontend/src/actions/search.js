import {
    PROFILE_LOADED,
    SEARCH_RESULT_RECEIVED,
    START_LOADING_PROFILE,
    START_SEARCHING,
    STOP_LOADING_PROFILE,
    STOP_SEARCHING
} from '../utils/constants/actionConstants'

import apiRequest from '../utils/helpers/apiRequest'

export const searchData = (query, page, size) => async(dispatch) => {
    dispatch({
        type: START_SEARCHING
    })

    apiRequest.get(`/users/users_search/${query}`, { page, size })
        .then(res => {
                dispatch({
                    type: SEARCH_RESULT_RECEIVED,
                    payload: res
                })
            }
        )
        .catch(() => dispatch({
            type: STOP_SEARCHING
        }))
}

export const getUserProfile = userId => async(dispatch) => {
    dispatch({
        type: START_LOADING_PROFILE
    })

    apiRequest.get(`/users/${userId}`, null, true)
        .then(res => {
                dispatch({
                    type: PROFILE_LOADED,
                    payload: res
                })
            }
        )
        .catch(() => dispatch({
            type: STOP_LOADING_PROFILE
        }))
}
