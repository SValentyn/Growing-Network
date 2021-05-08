import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {IconButton, Input, Paper, Toolbar, Tooltip, Typography, Zoom} from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SearchIcon from '@material-ui/icons/Search'

import Preloader from '../../../Preloader/Preloader'
import StatusIcon from '../../../StatusIcon/StatusIcon'
import {getLastActiveTime} from '../../../../utils/helpers/dateFormatter'
import {getFullName} from '../../../../utils/helpers/commonFormatter'

import useStyles from './chatToolbarStyles'
import {get} from 'lodash'

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
    const chatName = isChatGrouped
        ? chat.name
        : (<p className={classes.otherParticipant}>
                Chat with&nbsp;
                <Link to={`/profile/${get(otherParticipant, 'username')}`} className={classes.otherParticipantLink}>
                    <span className={classes.commentAuthor}>
                        {getFullName(otherParticipant)}
                    </span>
                </Link>
            </p>
        )

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        handleSearch(e.target.value)
    }

    const ActiveStatus = getLastActiveTime(lastActivityTime) === 'online'
        ? (
            <Fragment>
                <StatusIcon className={classes.statusIcon} color="active"/>
                <Typography variant="body2" className={classes.lastActivity}>
                    {getLastActiveTime(lastActivityTime)}
                </Typography>
            </Fragment>)
        : (
            <Fragment>
                <StatusIcon className={classes.statusIcon}
                            color={getLastActiveTime(lastActivityTime) === 'offline' ? 'inActive' : 'recently'}/>
                <Typography variant="body2" className={classes.lastActivity}>
                    {getLastActiveTime(lastActivityTime)}
                </Typography>
            </Fragment>)

    return (
        <Toolbar className={classnames(classes.root, className)}>
            {isSingleChat && <Tooltip title="Back to Messenger" TransitionComponent={Zoom}>
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
                <Typography variant="h5">{chatName}</Typography>
                {!isChatGrouped && <div className={classes.activity}>
                    {activeFriendsAreLoading ? <Preloader size={10}/> : ActiveStatus}
                </div>}
            </div>
            <Paper className={classes.search} elevation={1}>
                <SearchIcon className={classes.searchIcon}/>
                <Input
                    className={classes.searchInput}
                    disableUnderline
                    placeholder="Message Search"
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
