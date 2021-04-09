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
import {addPagedPayload} from '../utils/helpers/payloadAdapter'

const initialState = {
    userFriends: [],
    currentUserFriends: [],
    incomingFriendRequests: [],
    friendSuggestions: [],
    friendSuggestionsAreLoading: false,
    activeFriends: [],
    loadingActiveFriends: false,
    loading: false
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case FRIENDS_STARTED_LOADING:
            return {...state, loading: true}

        case FRIENDS_STOPPED_LOADING:
            return {...state, loading: false}

        case FRIENDS_RECEIVED:
            return {
                ...state,
                userFriends: addPagedPayload(state.userFriends, payload, 'username'),
                loading: false
            }

        case ACTIVE_FRIENDS_STARTED_LOADING:
            return {...state, loadingActiveFriends: true}

        case ACTIVE_FRIENDS_RECEIVED:
            return {
                ...state,
                activeFriends: addPagedPayload(state.activeFriends, payload, 'username'),
                loadingActiveFriends: false
            }

        case ACTIVE_FRIENDS_STOPPED_LOADING:
            return {...state, loadingActiveFriends: false}

        case RESET_ACTIVE_FRIENDS:
            return {...state, activeFriends: []}

        case CURRENT_USER_FRIENDS_RECEIVED:
            return {
                ...state,
                currentUserFriends: addPagedPayload(state.userFriends, payload, 'username')
            }

        case FRIEND_SUGGESTIONS_STARTED_LOADING:
            return {...state, friendSuggestionsAreLoading: true}

        case FRIEND_SUGGESTIONS_RECEIVED:
            return {...state, friendSuggestions: payload, friendSuggestionsAreLoading: false}

        case FRIEND_SUGGESTIONS_STOPPED_LOADING:
            return {...state, friendSuggestionsAreLoading: false}

        case INCOMING_FRIEND_REQUESTS_RECEIVED:
            return {...state, incomingFriendRequests: payload}

        case REQUEST_CONFIRMED:
            return {
                ...state,
                userFriends: state.userFriends.concat(payload),
                incomingFriendRequests: state.incomingFriendRequests.filter(item => item.requester.username !== payload.username)
            }

        case REQUEST_DELETED:
            return {
                ...state,
                incomingFriendRequests: state.incomingFriendRequests.filter(item => item.id !== payload.id)
            }

        case FRIEND_DELETED:
            return {
                ...state,
                userFriends: state.userFriends.filter(friend => friend.username !== payload.username)
            }

        case RESET_FRIENDS:
            return {...state, userFriends: []}

        case RESET_FRIEND_SUGGESTIONS:
            return {...state, friendSuggestions: []}

        default:
            return {...state}
    }
}
