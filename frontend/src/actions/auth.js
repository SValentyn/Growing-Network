import apiRequest from '../utils/helpers/apiRequest'
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
import { Toastr } from '../utils/toastr/Toastr'

/**
 * Load current User
 */
export const loadUser = () => (dispatch) => {
    dispatch({
        type: START_LOADING
    })

    apiRequest.get('/users/current')
        .then(data => {
            dispatch({
                type: USER_LOADED,
                payload: data
            })
        })
        .catch(() => {
            dispatch({
                type: AUTH_ERROR
            })
        })
}

/**
 * Register new User
 */
export const register = (registerData) => async(dispatch) => {
    try {
        dispatch({
            type: START_LOADING
        })

        const data = await apiRequest.post('/users', registerData, {}, false)

        Toastr.success('Congratulations! Your account was successfully registered!')
        apiRequest.rememberUser(data.accessToken)
        dispatch({
            type: REGISTER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

/**
 * Login into Profile
 */
export const login = ({ username, password }) => async(dispatch) => {
    const body = { username, password }

    try {
        dispatch({
            type: START_LOADING
        })

        const data = await apiRequest.post('/auth/access-token', body, {}, false)
        Toastr.success('You are successfully logged in!')
        apiRequest.rememberUser(data.accessToken)

        dispatch({
            type: LOGIN_SUCCESS
        })
    } catch (error) {
        if (error.status === 400) {
            Toastr.error('Wrong username or password! Please check your data and try again.')
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

/**
 * Logout from Profile
 */
export const logout = () => (dispatch) => {
    apiRequest.forgetUser()
    dispatch({ type: LOGOUT })
}

/**
 * Reset password
 */
export const resetPassword = (email) => async(dispatch) => {
    dispatch({ type: START_LOADING })

    try {
        await apiRequest.post('/users/reset_password', { email }, null, false)
        dispatch({ type: PASSWORD_RESET })
    } catch (e) {
        dispatch({ type: STOP_LOADING })
    }
}

/**
 * Set new password
 */
export const setNewPassword = (password, token) => async(dispatch) => {
    dispatch({ type: START_LOADING })

    try {
        await apiRequest.post('/users/set_new_password/' + token, { password }, null, false)
        dispatch({ type: STOP_LOADING })
        return true
    } catch (e) {
        dispatch({ type: STOP_LOADING })
        return false
    }
}

/**
 * Confirm email
 */
export const confirmEmail = (token) => (dispatch) => {
    dispatch({
        type: START_LOADING
    })

    apiRequest.get('/users/email/confirm/' + token, {}, false)
        .then(() => dispatch({
            type: EMAIL_CONFIRMED
        }))
        .catch(() => dispatch({
            type: STOP_LOADING
        }))
}

/**
 * Update Profile
 */
export const updateProfile = (dataForm) => (dispatch) => {
    return apiRequest.put('/users', dataForm)
        .then(data => dispatch({
                type: USER_LOADED,
                payload: data
            })
        )
        .then(() => window.location.reload())
}
