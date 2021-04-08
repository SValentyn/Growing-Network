import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
import auth from './auth'
import posts from './posts'
import search from './search'
import images from './images'
import friends from './friends'
import chat from './chat'
import profileTab from './profileTab'

export default combineReducers({
    auth,
    posts,
    search,
    images,
    friends,
    chat,
    profileTab,
    toastr: toastrReducer
})
