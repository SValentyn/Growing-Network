import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {IconButton, Input, Paper, Toolbar, Tooltip, Typography} from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SearchIcon from '@material-ui/icons/Search'

import Preloader from '../../../Preloader/Preloader'
import StatusIcon from '../../../StatusIcon/StatusIcon'
import {getActiveTime} from '../../../../utils/helpers/dateFormatter'
import {getFullName} from '../../../../utils/helpers/commonFormatter'

import useStyles from './chatToolbarStyles'

const ChatToolbar = ({
    chat,
    className,
    isSingleChat,
    isChatGrouped,
    isActive,
    lastActivityTime,
    activeFriendsAreLoading,
    handleSearch,
    ownMessageSent,
    selectedChatId,
    otherParticipant
}) => {
    useEffect(() => {
        setInputValue('')
    }, [ownMessageSent, selectedChatId])

    const classes = useStyles()
    const [inputValue, setInputValue] = useState('')
    const chatName = isChatGrouped ? chat.name : `Chat with ${getFullName(otherParticipant)}`

    const handleInputChange = evt => {
        setInputValue(evt.target.value)
        handleSearch(evt.target.value)
    }

    const ActiveStatus = isActive ? (
        <Fragment>
            <StatusIcon
                className={classes.statusIcon}
                color="active"
            />
            <Typography variant="body2">{getActiveTime(lastActivityTime)}</Typography>
        </Fragment>
    ) : (
        <Fragment>
            <StatusIcon
                className={classes.statusIcon}
                color="inActive"
            />
            <Typography variant="body2">Offline</Typography>
        </Fragment>
    )

    return (
        <Toolbar
            className={classnames(classes.root, className)}
        >
            {isSingleChat && <Tooltip title="To chat">
                <IconButton
                    className={classes.backButton}
                    component={Link}
                    edge="start"
                    to={`/chat/${chat.id}`}
                >
                    <KeyboardBackspaceIcon/>
                </IconButton>
            </Tooltip>}
            <div className={classes.user}>
                <Typography variant="h6">{chatName}</Typography>
                {!isChatGrouped && <div className={classes.activity}>
                    {activeFriendsAreLoading ? <Preloader size={10}/> : ActiveStatus}
                </div>}
            </div>
            <Paper className={classes.search}>
                <SearchIcon className={classes.searchIcon}/>
                <Input
                    className={classes.searchInput}
                    disableUnderline
                    placeholder="Search message"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </Paper>
        </Toolbar>
    )
}

ChatToolbar.propTypes = {
    className: PropTypes.string,
    chat: PropTypes.object.isRequired,
    withoutSidepanel: PropTypes.bool,
    isChatGrouped: PropTypes.bool.isRequired,
    isSingleChat: PropTypes.bool,
    isActive: PropTypes.bool.isRequired,
    activeFriendsAreLoading: PropTypes.bool.isRequired,
    lastActivityTime: PropTypes.number,
    handleSearch: PropTypes.func.isRequired,
    ownMessageSent: PropTypes.bool,
    selectedChatId: PropTypes.number,
    otherParticipant: PropTypes.object.isRequired
}

export default ChatToolbar
