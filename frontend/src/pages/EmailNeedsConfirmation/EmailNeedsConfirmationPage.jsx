import React, {Fragment} from 'react'
import {Link, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'

import useStyles from './EmailNeedsConfirmationPageStyles'

const EmailNeedsConfirmationPage = ({emailIsConfirmed}) => {
    const classes = useStyles()
    const history = useHistory()

    const goBack = e => {
        e.preventDefault()
        window.location = '/login'
    }

    if (emailIsConfirmed) {
        history.goBack()
    }

    return (
        <Fragment>
            <CssBaseline/>
            <Grid container justify="center" alignItems="center" style={{height: '80vh'}}>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" color="textPrimary" gutterBottom>
                            <EmailIcon className={classes.icon}/>
                            <p>To confirm registration in the system, please follow the link sent to your email.</p>
                            <p>After that,&nbsp;<Link to="/" variant="inherit" className={classes.link}
                                                      onClick={goBack}>log in</Link>
                                &nbsp;to the network. We&apos;ve been waiting for you!
                            </p>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

EmailNeedsConfirmationPage.propTypes = {
    emailIsConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    emailIsConfirmed: state.auth.emailIsConfirmed
})

export default connect(mapStateToProps, null)(EmailNeedsConfirmationPage)
