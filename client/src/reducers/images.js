import {PHOTOS_END_LOADING, PHOTOS_START_LOADING, USER_PHOTOS_RECEIVED} from '../utils/constants/actionsName'

const initialState = {
    userPhotos: [],
    loading: false
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case PHOTOS_START_LOADING:
            return {...state, loading: true}

        case PHOTOS_END_LOADING:
            return {...state, loading: false}

        case USER_PHOTOS_RECEIVED:
            return {...state, userPhotos: payload, loading: false}

        default:
            return {...state}
    }
}
