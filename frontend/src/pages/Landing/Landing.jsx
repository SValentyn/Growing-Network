import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import {Button, CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import useStyles from './landingStyles'

const Landing = () => {
    const classes = useStyles()

    return (
        <Fragment>
            <CssBaseline/>
            <Grid container spacing={3} justify="center" alignItems="center" style={{height: '80vh'}}>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography variant="h2" component="h1" color="textPrimary" gutterBottom>
                            GrowingNetwork
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" color="textSecondary" gutterBottom>
                            GrowingNetwork is a cool new social network! Share it with your friends!
                        </Typography>
                    </Paper>
                    <Paper className={classes.paper}>
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
