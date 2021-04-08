import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Avatar, Button, Container, CssBaseline, Grid, Paper, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {register} from '../../actions/auth'
import Preloader from '../../components/Preloader/Preloader'
import {
    areNoErrors,
    checkPasswordsMatch,
    validateEmail,
    validatePassword,
    validateUsername
} from '../../utils/helpers/inputValidators'

import useStyles from './registerStyles'

const Register = ({isAuthenticated, loading, register, emailIsConfirmed}) => {
    const classes = useStyles()
    const inputStyleProps = {
        InputProps: {
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
            }
        },
        InputLabelProps: {
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused
            }
        }
    }

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: '',
        usernameError: '',
        passwordError: '',
        repeatPasswordError: '',
        emailError: ''
    })

    const {
        username,
        email,
        password,
        password2,
        firstName,
        lastName,
        usernameError,
        passwordError,
        repeatPasswordError,
        emailError
    } = formData

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validate = () => {
        const errors = {}

        errors.passwordError = validatePassword(password)
        errors.repeatPasswordError = checkPasswordsMatch(password, password2)
        errors.usernameError = validateUsername(username)
        errors.emailError = validateEmail(email)

        setFormData({...formData, ...errors})

        return areNoErrors(errors)
    }

    const onSubmit = async e => {
        e.preventDefault()
        const inputIsValid = validate()

        if (inputIsValid) {
            register({email, username, password, firstName, lastName})
        }
    }

    if (isAuthenticated && !emailIsConfirmed) {
        return <Redirect to="/access_denied"/>
    }

    if (isAuthenticated && emailIsConfirmed) {
        return <Redirect to="/"/>
    }

    return loading ? <Preloader/> : (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                label="username"
                                value={username}
                                onChange={e => onChange(e)}
                                error={!(usernameError === '')}
                                helperText={usernameError === '' ? '' : usernameError}
                                {...inputStyleProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                label="email"
                                value={email}
                                onChange={e => onChange(e)}
                                error={!(emailError === '')}
                                helperText={emailError === '' ? '' : emailError}
                                {...inputStyleProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => onChange(e)}
                                error={!(passwordError === '')}
                                helperText={passwordError === '' ? '' : passwordError}
                                {...inputStyleProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Repeat password"
                                type="password"
                                autoComplete="current-password"
                                value={password2}
                                onChange={e => onChange(e)}
                                error={!(repeatPasswordError === '')}
                                helperText={repeatPasswordError === '' ? '' : repeatPasswordError}
                                {...inputStyleProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First name"
                                value={firstName}
                                onChange={e => onChange(e)}
                                {...inputStyleProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="lastName"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last name"
                                value={lastName}
                                onChange={e => onChange(e)}
                                {...inputStyleProps}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2" className={classes.link}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
    emailIsConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    emailIsConfirmed: state.auth.emailIsConfirmed
})

export default connect(mapStateToProps, {register})(Register)
