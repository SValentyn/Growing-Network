import {
    AUTH_ERROR,
    EMAIL_CONFIRMED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PASSWORD_RESET,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    START_LOADING,
    STOP_LOADING,
    USER_LOADED
} from '../utils/constants/actionConstants'

const initialState = {
    isAuthenticated: false,
    authFailed: false,
    loading: false,
    user: null,
    resetEmailSend: false,
    emailIsConfirmed: false
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case START_LOADING:
            return {...state, loading: true}

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
                emailIsConfirmed: payload.emailIsConfirmed
            }

        case REGISTER_SUCCESS:
            return {...state, isAuthenticated: true, authFailed: false}

        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, authFailed: false, loading: false}

        case REGISTER_FAIL:
            return {...state, loading: false}

        case AUTH_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                authFailed: true,
                emailIsConfirmed: false,
                loading: false
            }

        case LOGIN_FAIL:
            return {...state, loading: false}

        case LOGOUT:
            return {...state, user: null, isAuthenticated: false, emailIsConfirmed: false, loading: false}

        case EMAIL_CONFIRMED:
            return {...state, loading: false, emailIsConfirmed: true}

        case PASSWORD_RESET:
            return {...state, resetEmailSend: true, loading: false}

        case STOP_LOADING:
            return {...state, loading: false}

        default:
            return {...state}
    }
}
