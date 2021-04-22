import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SockJsClient from 'react-stomp'
import {get} from 'lodash'

import apiRequest from '../../../utils/helpers/apiRequest'
import {
    addMessageToCurrentChat,
    getUnreadChats,
    saveMessageNotification,
    sendChatBeenReadNotification
} from '../../../actions/chat'

const ChatUpdateCenter = ({
    currentUserName,
    unreadChats,
    getUnreadChats,
    sendChatBeenReadNotification,
    addMessageToCurrentChat,
    saveMessageNotification,
    openChatId
}) => {
    const onBrokerMessageReceive = (msg) => {
        const newMsgChatId = get(msg, 'chat.id')

        if (openChatId === newMsgChatId) {
            sendChatBeenReadNotification(newMsgChatId)
            addMessageToCurrentChat(msg)
        } else {
            saveMessageNotification(msg, unreadChats)
        }
    }

    useEffect(() => { getUnreadChats() }, [getUnreadChats])

    return (
        <SockJsClient url={apiRequest.getSocketUrl()}
                      topics={[`/topic/messages/${currentUserName}`]}
                      onMessage={onBrokerMessageReceive}
        />
    )
}

ChatUpdateCenter.propTypes = {
    currentUserName: PropTypes.string.isRequired,
    unreadChats: PropTypes.array.isRequired,
    getUnreadChats: PropTypes.func.isRequired,
    addMessageToCurrentChat: PropTypes.func.isRequired,
    sendChatBeenReadNotification: PropTypes.func.isRequired,
    saveMessageNotification: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
    openChatId: PropTypes.number
}

const mapStateToProps = (state) => ({
    currentUserName: state.auth.user.username,
    unreadChats: state.chat.unreadChats,
    selectedTab: state.profileTab.selectedTab,
    openChatId: state.chat.openChatId
})

const mapDispatchToProps = (dispatch) => ({
    getUnreadChats: () => dispatch(getUnreadChats()),
    addMessageToCurrentChat: msg => dispatch(addMessageToCurrentChat(msg)),
    sendChatBeenReadNotification: chatId => dispatch(sendChatBeenReadNotification(chatId)),
    saveMessageNotification: (msg, unreadChats) => dispatch(saveMessageNotification(msg, unreadChats))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatUpdateCenter)
