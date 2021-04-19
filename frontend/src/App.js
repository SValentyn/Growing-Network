import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {SmoothProvider} from 'react-smooth-scrolling'
import {Provider} from 'react-redux'
import store from './store'

import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import Background from './components/Background/Background'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import EmailConfirmedPage from './pages/EmailConfirmed/EmailConfirmedPage'
import EmailNeedsConfirmationPage from './pages/EmailNeedsConfirmation/EmailNeedsConfirmationPage'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import NewPassword from './pages/NewPassword/NewPassword'
import Toastr from './components/Toastr/Toastr'

function App() {
    return (
        <SmoothProvider skew={true} ease={0.0}>
            <Provider store={store}>
                <Toastr/>
                <Router>
                    <Navbar/>
                    <Background>
                        <Switch>
                            <Route exact path="/access_denied" component={EmailNeedsConfirmationPage}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/email/confirm/:token" component={EmailConfirmedPage}/>
                            <Route exact path="/password_reset" component={ResetPassword}/>
                            <Route exact path="/change_password/:token" component={NewPassword}/>
                            <Route path="/" component={ProtectedRouter}/>
                        </Switch>
                    </Background>
                </Router>
            </Provider>
        </SmoothProvider>
    )
}

export default App
