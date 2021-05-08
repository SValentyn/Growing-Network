import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {register} from '../../actions/auth'
import Preloader from '../../components/Preloader/Preloader'
import {
    areNoErrors,
    checkPasswordsMatch,
    validateEmail,
    validatePassword,
    validateUsername
} from '../../utils/helpers/inputValidator'

import useStyles from './registerStyles'
import IconButton from '@material-ui/core/IconButton'
import {Visibility, VisibilityOff} from '@material-ui/icons'

const Register = ({isAuthenticated, loading, register, emailIsConfirmed}) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        usernameError: '',
        passwordError: '',
        repeatPasswordError: '',
        emailError: '',
        showPassword: false,
        showRepeatPassword: false
    })

    const {
        username,
        email,
        password,
        repeatPassword,
        firstName,
        lastName,
        usernameError,
        passwordError,
        repeatPasswordError,
        emailError,
        showPassword,
        showRepeatPassword
    } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleClickShowPassword = () => {
        setFormData({...formData, showPassword: !formData.showPassword})
    }

    const handleClickShowRepeatPassword = () => {
        setFormData({...formData, showRepeatPassword: !formData.showRepeatPassword})
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    const validate = () => {
        const errors = {}

        errors.passwordError = validatePassword(password)
        errors.repeatPasswordError = checkPasswordsMatch(password, repeatPassword)
        errors.usernameError = validateUsername(username)
        errors.emailError = validateEmail(email)

        setFormData({...formData, ...errors})

        return areNoErrors(errors)
    }

    const onSubmit = async(e) => {
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
            <Paper className={classes.paper} elevation={1}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                label="First name"
                                value={firstName}
                                onChange={e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoComplete="lastName"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last name"
                                value={lastName}
                                onChange={e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                error={!(usernameError === '')}
                                helperText={usernameError === '' ? '' : usernameError}
                                onChange={e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                                value={email}
                                error={!(emailError === '')}
                                helperText={emailError === '' ? '' : emailError}
                                onChange={e => onChange(e)}
                            />
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
                            {!(passwordError === '')
                                ? (<FormHelperText id="password-error" error={true}>
                                        {passwordError}
                                    </FormHelperText>
                                ) : null
                            }
                        </FormControl>

                        <FormControl variant="outlined" className={classes.passwordContainer}>
                            <InputLabel htmlFor="outlined-adornment-repeatPassword">Repeat password *</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-repeatPassword"
                                name="repeatPassword"
                                labelWidth={136}
                                type={formData.showRepeatPassword ? 'text' : 'password'}
                                value={repeatPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRepeatPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {formData.showRepeatPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                required
                                fullWidth
                                autoComplete="current-password"
                                error={!(repeatPasswordError === '')}
                                onChange={e => onChange(e)}
                            />
                            {!(repeatPasswordError === '')
                                ? (<FormHelperText id="repeatPassword-error" error={true}>
                                        {repeatPasswordError}
                                    </FormHelperText>
                                ) : null
                            }
                        </FormControl>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item style={{marginTop: 6}}>
                            <Link to="/login" variant="body2" className={classes.link}>
                                Already have an account? Sign in!
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
