import React from 'react'
import PropTypes from 'prop-types'

import { EmptyMessages } from '../../EmptyMessage/EmptyMessage'

import useStyles from './chatPlaceholderStyles'

const ChatPlaceholder = () => {
    const classes = useStyles()

    return (
        <EmptyMessages className={classes.container}> Please, select Chat </EmptyMessages>
    )
}

ChatPlaceholder.propTypes = {
    className: PropTypes.string
}

export default ChatPlaceholder
