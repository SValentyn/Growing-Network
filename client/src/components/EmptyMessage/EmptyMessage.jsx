import React from 'react'
import PropTypes from 'prop-types'
import {Paper, Typography} from '@material-ui/core'
import classnames from 'classnames'

import useStyles from './emptyMessagesStyles'

export const EmptyMessages = ({height, className, children}) => {
    const classes = useStyles({height})

    return (
        <Paper className={classnames(classes.root, className)}>
            <Typography>{children}</Typography>
        </Paper>
    )
}

EmptyMessages.propTypes = {
    height: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node
}
