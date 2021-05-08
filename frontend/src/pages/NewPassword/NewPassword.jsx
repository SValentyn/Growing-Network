import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Preloader from '../../components/Preloader/Preloader'

import {setNewPassword} from '../../actions/auth'
import {areNoErrors, checkPasswordsMatch, validatePassword} from '../../utils/helpers/inputValidator'

import useStyles from './newPasswordStyles'
import IconButton from '@material-ui/core/IconButton'
import {Visibility, VisibilityOff} from '@material-ui/icons'

const NewPassword = ({loading, match, setNewPassword}) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        password: '',
        repeatPassword: '',
        passwordError: '',
        repeatPasswordError: '',
        responseReceived: false,
        passwordUpdated: false,
        showPassword: false,
        showRepeatPassword: false
    })

    const {
        password,
        repeatPassword,
        passwordError,
        repeatPasswordError,
        responseReceived,
        passwordUpdated,
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
        setFormData({...formData, ...errors})
        return areNoErrors(errors)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const inputIsValid = validate()

        if (inputIsValid) {
            const token = match.params.token
            setNewPassword(formData.password, token)
                .then(success => {
                    if (success) {
                        setFormData({...formData, responseReceived: true, passwordUpdated: true})
                    } else {
                        setFormData({...formData, responseReceived: true, passwordUpdated: false})
                    }
                })
        }
    }

    const recoveryResponseMessage = passwordUpdated ? 'Your password has been successfully updated!' : 'Unable to update password...'
    const recoveryNextLink = passwordUpdated ? '/login' : '/password_reset'
    const recoveryNextBtnText = passwordUpdated ? 'go to login' : 'try again'

    if (loading) {
        return <Preloader/>
    } else {
        return (
            <Container component="main" maxWidth="xs" className={classes.container}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    {!responseReceived ? (
                        <Fragment>
                            <Typography component="h1" variant="h5">
                                Put your new strong password
                            </Typography>
                            <form className={classes.form} onSubmit={e => onSubmit(e)}>
                                <Grid container spacing={2}>
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
                                        <InputLabel htmlFor="outlined-adornment-repeatPassword">
                                            Repeat password *
                                        </InputLabel>
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
                                <Button type="submit" fullWidth variant="contained" color="primary"
                                        className={classes.submit}>
                                    Update password
                                </Button>
                            </form>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography component="h1" variant="h5" className={classes.center}>
                                {recoveryResponseMessage}
                            </Typography>
                            <Link to={recoveryNextLink} className={classes.linkBtn}>
                                <Button fullWidth variant="contained" color="primary" className={classes.submit}>
                                    {recoveryNextBtnText}
                                </Button>
                            </Link>
                        </Fragment>
                    )}
                </div>
            </Container>)
    }
}

NewPassword.propTypes = {
    loading: PropTypes.bool.isRequired,
    setNewPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {setNewPassword})(NewPassword)
