/* global URLSearchParams */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect, Route, Switch, useLocation} from 'react-router-dom'

import HomePage from '../../pages/HomePage/HomePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import {loadUser} from '../../actions/auth'
import Preloader from '../Preloader/Preloader'
import Chat from '../Chat/Chat'
import apiRequest from '../../utils/helpers/apiRequest'

const ProtectedRouter = ({authFailed, emailIsConfirmed, user, loadUser}) => {
    const token = new URLSearchParams(useLocation().search).get('token')
    if (token) {
        apiRequest.rememberUser(token)
    }

    useEffect(() => loadUser(), [loadUser])
    if (authFailed) {
        return <Redirect to="/login"/>
    } else if (user === null) {
        return <Preloader fullScreen/>
    } else if (!emailIsConfirmed) {
        return <Redirect to="/access_denied"/>
    } else {
        return (
            <Switch>
                <Route exact path="/profile/:userId" component={ProfilePage}/>
                <Route exact path="/me" component={ProfilePage}/>
                <Route exact path="/chat" component={Chat}/>
                <Route exact path="/chat/:chatId" component={Chat}/>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        )
    }
}

ProtectedRouter.propTypes = {
    authFailed: PropTypes.bool.isRequired,
    user: PropTypes.object,
    emailIsConfirmed: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    authFailed: state.auth.authFailed,
    user: state.auth.user,
    emailIsConfirmed: state.auth.emailIsConfirmed
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadUser: () => dispatch(loadUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter)
