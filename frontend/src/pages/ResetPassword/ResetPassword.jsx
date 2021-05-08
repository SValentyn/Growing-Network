import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Avatar, Button, Container, CssBaseline, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {resetPassword} from '../../actions/auth'
import {validateEmail} from '../../utils/helpers/inputValidator'

import useStyles from './resetPasswordStyles'

const ResetPassword = ({isAuthenticated, resetPassword, resetEmailSend}) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        email: '',
        emailError: ''
    })

    let {email, emailError} = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validateInput = () => {
        const emailError = validateEmail(email)
        setFormData({...formData, emailError})
        return emailError === ''
    }

    const onSubmit = async e => {
        e.preventDefault()
        const inputIsValid = validateInput()

        if (inputIsValid) {
            resetPassword(email)
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/"/>
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <Paper className={classes.paper} elevation={1}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.header}>
                    Reset your password
                </Typography>
                {!resetEmailSend ? (
                    <Fragment>
                        <Typography component="h2" variant="body2">
                            Enter your user account verified email and we will send you a password reset link.
                        </Typography>
                        <form className={classes.form} onSubmit={e => onSubmit(e)}>
                            <TextField
                                type="input"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                error={!(emailError === '')}
                                helperText={emailError === '' ? '' : emailError}
                                onChange={e => onChange(e)}
                            />
                            <Button type="submit" fullWidth variant="contained" color="primary"
                                    className={classes.submit}>
                                Send password reset email
                            </Button>
                        </form>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Typography component="h2" variant="body2" className={classes.center}>
                            E-mail sent!<br/>
                            Check your email for a link to reset your password. If it doesn&apos;t show up within a few
                            minutes, check your spam folder.
                        </Typography>
                        <Link to="/login" className={classes.linkBtn}>
                            <Button fullWidth variant="contained" color="primary" className={classes.submit}>
                                Return to Log In
                            </Button>
                        </Link>
                    </Fragment>
                )}
            </Paper>
        </Container>
    )
}

ResetPassword.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    resetPassword: PropTypes.func.isRequired,
    resetEmailSend: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    resetEmailSend: state.auth.resetEmailSend
})

export default connect(mapStateToProps, {resetPassword})(ResetPassword)
