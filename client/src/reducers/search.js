import {
    PROFILE_LOADED,
    SEARCH_RESULT_RECEIVED,
    START_LOADING_PROFILE,
    START_SEARCHING,
    STOP_LOADING_PROFILE,
    STOP_SEARCHING
} from '../utils/constants/actionConstants'

const initialState = {
    searchResults: [],
    userProfile: {
        friends: [],
        incomingFriendRequests: []
    },
    profileLoading: false,
    searchResultLoading: false
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case START_SEARCHING:
            return {...state, searchResultLoading: true}

        case START_LOADING_PROFILE:
            return {...state, profileLoading: true}

        case STOP_SEARCHING:
            return {...state, searchResultLoading: false}

        case STOP_LOADING_PROFILE:
            return {...state, profileLoading: false}

        case SEARCH_RESULT_RECEIVED:
            return {...state, searchResults: payload, searchResultLoading: false}

        case PROFILE_LOADED:
            return {...state, userProfile: payload, profileLoading: false}

        default:
            return {...state}
    }
}
