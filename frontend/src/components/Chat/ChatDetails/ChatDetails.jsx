import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {Divider} from '@material-ui/core'
import {find, get} from 'lodash'

import Preloader from '../../Preloader/Preloader'
import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'
import {clearCurrentChatMessages, sendChatBeenReadNotification} from '../../../actions/chat'
import {loadActiveFriends} from '../../../actions/friends'

import useStyles from './chatDetailsStyles'

const ChatDetails = ({
    authUser,
    chat,
    messages,
    className,
    messagesLoading,
    loadContentHandler,
    ownMessageSent,
    isLastPageInChat,
    clearCurrentChatMessages,
    sendChatBeenReadNotification,
    isSingleChat,
    containerHeight = 'FULL',
    activeFriends,
    activeFriendsAreLoading,
    loadActiveFriends,
    handleSearch,
    selectedChatId
}) => {
    const classes = useStyles()
    const isChatGrouped = chat.participants.length > 2

    useEffect(() => {
        sendChatBeenReadNotification(chat.id)
        loadActiveFriends(0, 100, true)

        return () => clearCurrentChatMessages()
    }, [chat.id, sendChatBeenReadNotification, loadActiveFriends, clearCurrentChatMessages])

    const otherParticipant = find(chat.participants, (participant) => participant.username !== authUser)
    const activeParticipant = find(activeFriends, {username: otherParticipant.username})
    const lastActivityTime = get(activeParticipant, 'lastActivityTime')

    return (
        <div
            className={classnames(classes.root, className,
                {
                    [classes.fullHeight]: containerHeight === 'FULL',
                    [classes.halfHeight]: containerHeight === 'HALF'
                })}
        >
            {messagesLoading
                ? <Preloader fullScreen/>
                : <Fragment>
                    <ChatToolbar
                        chat={chat}
                        authUser={authUser}
                        isSingleChat={isSingleChat}
                        isChatGrouped={isChatGrouped}
                        isActive={!!activeParticipant}
                        lastActivityTime={lastActivityTime}
                        activeFriendsAreLoading={activeFriendsAreLoading}
                        handleSearch={handleSearch}
                        ownMessageSent={ownMessageSent}
                        selectedChatId={selectedChatId}
                        otherParticipant={otherParticipant}
                    />
                    <Divider/>
                    <ChatMessages
                        messages={messages}
                        authUser={authUser}
                        messagesLoading={messagesLoading}
                        loadContentHandler={loadContentHandler}
                        ownMessageSent={ownMessageSent}
                        isLastPageInChat={isLastPageInChat}
                        isChatGrouped={isChatGrouped}
                    />
                    <Divider/>
                    <SendMessage chatId={chat.id}/>
                </Fragment>}
        </div>
    )
}

ChatDetails.propTypes = {
    className: PropTypes.string,
    chat: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    authUser: PropTypes.string.isRequired,
    messagesLoading: PropTypes.bool,
    loadContentHandler: PropTypes.func.isRequired,
    ownMessageSent: PropTypes.bool,
    isLastPageInChat: PropTypes.bool,
    containerHeight: PropTypes.string,
    isSingleChat: PropTypes.bool,
    clearCurrentChatMessages: PropTypes.func.isRequired,
    sendChatBeenReadNotification: PropTypes.func.isRequired,
    activeFriends: PropTypes.array.isRequired,
    activeFriendsAreLoading: PropTypes.bool.isRequired,
    loadActiveFriends: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    selectedChatId: PropTypes.number
}
const mapStateToProps = state => ({
    activeFriends: state.friends.activeFriends,
    activeFriendsAreLoading: state.friends.loadingActiveFriends
})

const mapDispatchToProps = dispatch => ({
    clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
    sendChatBeenReadNotification: chatId => dispatch(sendChatBeenReadNotification(chatId)),
    loadActiveFriends: (page, size, isInitial) => dispatch(loadActiveFriends(page, size, isInitial))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)
