import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Avatar, Button, Container, CssBaseline, Grid, TextField, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Preloader from '../../components/Preloader/Preloader'

import {setNewPassword} from '../../actions/auth'
import {areNoErrors, checkPasswordsMatch, validatePassword} from '../../utils/helpers/inputValidator'

import useStyles from './newPasswordStyles'

const NewPassword = ({loading, match, setNewPassword}) => {
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
        password: '',
        password2: '',
        passwordError: '',
        repeatPasswordError: '',
        responseReceived: false,
        passwordUpdated: false
    })

    const {
        password,
        password2,
        passwordError,
        repeatPasswordError,
        responseReceived,
        passwordUpdated
    } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validate = () => {
        const errors = {}
        errors.passwordError = validatePassword(password)
        errors.repeatPasswordError = checkPasswordsMatch(password, password2)
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
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={onChange}
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
                                            value={password2}
                                            onChange={onChange}
                                            error={!(repeatPasswordError === '')}
                                            helperText={repeatPasswordError === '' ? '' : repeatPasswordError}
                                            {...inputStyleProps}
                                        />
                                    </Grid>
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
                            <Link
                                to={recoveryNextLink}
                                className={classes.linkBtn}
                            >
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
