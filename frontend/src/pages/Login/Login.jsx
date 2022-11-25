import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import classNames from 'classnames'

import { login } from '../../actions/auth'
import Preloader from '../../components/Preloader/Preloader'
import { Toastr } from '../../utils/toastr/Toastr'
import { areNoErrors, validatePassword, validateUsername } from '../../utils/helpers/inputValidator'

import useStyles from './loginStyles'
import IconButton from '@material-ui/core/IconButton'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const googleLogo = '/static/images/google-icon.svg'

const Login = ({ isAuthenticated, login, loading }) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        showPassword: false,
    })

    const location = useLocation()
    const error = new URLSearchParams(location.search).get('error')
    const { username, password, usernameError, passwordError } = formData

    useEffect(() => {
        if (error) {
            Toastr.error(error)
        }
    }, [error])

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    const validate = () => {
        const errors = {}
        errors.passwordError = validatePassword(password)
        errors.usernameError = validateUsername(username)
        setFormData({ ...formData, ...errors })

        return areNoErrors(errors)
    }

    const proceedToGoogleOauth = () => {
        // window.location.replace('/api/v1/auth/google')
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        const inputIsValid = validate()

        if (inputIsValid) {
            login({ username, password })
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/"/>
    }

    return loading ? <Preloader/> : (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <Paper className={classes.paper} elevation={1}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <TextField
                        type="input"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => onChange(e)}
                        error={!(usernameError === '')}
                        helperText={usernameError === '' ? '' : usernameError}
                    />

                    <Grid container style={{ marginTop: -4 }}>
                        <Grid item xs align="right">
                            <Link to="/password_reset" variant="body2" className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <FormControl variant="outlined" className={classes.passwordContainer}>
                        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            labelWidth={82}
                            type={formData.showPassword ? 'text' : 'password'}
                            value={password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {formData.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                            fullWidth
                            autoComplete="current-password"
                            error={!(passwordError === '')}
                            onChange={e => onChange(e)}
                        />
                    </FormControl>

                    <Button type="submit" fullWidth variant="contained" color="primary"
                            className={classNames(classes.button, classes.submit)}>
                        Log In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classNames(classes.button, classes.googleBtn)}
                        onClick={proceedToGoogleOauth}
                    >
                        <img src={googleLogo} alt="Google" className={classes.googleIcon}/> Sign in with Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/register" variant="body2" className={classes.link}>
                                Don&apos;t have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})

export default connect(mapStateToProps, { login })(Login)
