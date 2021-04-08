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
        history.goBack()
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
                            <p>Please, confirm your email address to continue.</p>
                            <p>Follow the link that was sent to your mailbox and <span><Link
                                to="/"
                                variant="inherit"
                                className={classes.link}
                                onClick={goBack}>try log in.</Link>
                                </span>
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
