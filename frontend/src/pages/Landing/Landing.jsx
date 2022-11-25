import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button, CssBaseline, Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './landingStyles'

const Landing = () => {
    const classes = useStyles()

    return (
        <Fragment>
            <CssBaseline/>
            <Grid container spacing={3} justify="center" alignItems="center" style={{ height: '80vh' }}>
                <Grid item xs={10}>
                    <Paper className={classes.paper} elevation={1}>
                        <Typography variant="h2" component="h1" color="textPrimary" gutterBottom>
                            Growing Network
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper} elevation={1}>
                        <Typography variant="h4" color="textSecondary" gutterBottom>
                            Growing Network is a cool new social network! Share it with your friends!
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper} elevation={1}>
                        <Grid item xs={10} className={classes.btns_container}>
                            <Button variant="contained" size="large" color="primary" className={classes.buttons}>
                                <Link to="/login" className={classes.link}>Sign In</Link>
                            </Button>
                            <Button variant="contained" size="large" color="secondary" className={classes.buttons}>
                                <Link to="/register" className={classes.link}>Sign Up</Link>
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Landing
