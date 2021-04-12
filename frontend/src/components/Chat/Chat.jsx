import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {find, isEmpty} from 'lodash'

import ChatList from './ChatList/ChatList'
import ChatDetails from './ChatDetails/ChatDetails'
import ChatPlaceholder from './ChatPlaceholder/ChatPlaceholder'
import {getAllChats, getChat, getMessagesForChat} from '../../actions/chat'

import useStyles from './chatStyles'

const FIRST_PAGE = 0
const PAGE_SIZE = 12

const Chat = ({
    chat,
    isSingleChat,
    containerHeight,
    authUser,
    chats,
    getAllChats,
    getChat,
    chatMessages,
    getMessagesForChat,
    messagesLoading,
    ownMessageSent,
    chatsLoading,
    isLastPageInChat,
    unreadChats
}) => {
    const classes = useStyles()
    const {chatId, userId} = useParams()
    const [sortedChats, setSortedChats] = useState([])
    const [sortedMessages, setSortedMessages] = useState([])
    const [isSearchChatsApply, setIsSearchChatsApply] = useState(false)
    const [isSearchMessagesApply, setIsSearchMessagesApply] = useState(false)
    let selectedChat, selectedChatId, loadContentHandler

    useEffect(() => {
        if (!isSingleChat) {
            getAllChats()
        } else {
            getChat(userId)
        }
        setIsSearchMessagesApply(false)
        setIsSearchChatsApply(false)
    }, [getAllChats, getChat, isSingleChat, userId])

    if (!isEmpty(chat) && isSingleChat) {
        selectedChat = chat
        selectedChatId = chat.id
        loadContentHandler = getMessagesForChat.bind(null, selectedChatId)
    } else if (!isEmpty(chats) && !isSingleChat) {
        selectedChat = chatId
            ? chats.find(chat => chat.id === +chatId)
            : chats[0]
        selectedChatId = selectedChat.id
        loadContentHandler = getMessagesForChat.bind(null, selectedChatId)
    }

    useEffect(() => {
        if (selectedChatId) {
            getMessagesForChat(selectedChatId, FIRST_PAGE, PAGE_SIZE, true)
            setIsSearchMessagesApply(false)
            setIsSearchChatsApply(false)
        }
    }, [getMessagesForChat, selectedChatId])

    const handleChatsSearch = query => {
        if (!query) {
            return setIsSearchChatsApply(false)
        }
        const sortedChats = chats.filter(chat => {
            const secondParticipant = find(chat.participants, participant => participant.username !== authUser)

            return secondParticipant.firstName.toLowerCase().includes(query.toLowerCase()) ||
                secondParticipant.lastName.toLowerCase().includes(query.toLowerCase())
        })

        setSortedChats(sortedChats)
        setIsSearchChatsApply(true)
    }
    const handleMessagesSearch = query => {
        if (!query) {
            return setIsSearchMessagesApply(false)
        }
        const sortedMessages = chatMessages.filter(msg => msg.text.toLowerCase().includes(query.toLowerCase()))

        setIsSearchMessagesApply(true)
        setSortedMessages(sortedMessages)
    }

    return (
        <div className={classes.root}>
            {!isSingleChat &&
            <ChatList
                className={classes.chatList}
                chats={isSearchChatsApply ? sortedChats : chats}
                chatMessages={chatMessages}
                chatsLoading={chatsLoading}
                selectedChatId={selectedChatId}
                authUser={authUser}
                unreadChats={unreadChats}
                handleSearch={handleChatsSearch}
            />
            }
            {selectedChat ? (
                <ChatDetails
                    authUser={authUser}
                    className={classes.chatDetails}
                    chat={selectedChat}
                    messages={isSearchMessagesApply ? sortedMessages : chatMessages}
                    messagesLoading={messagesLoading}
                    loadContentHandler={loadContentHandler}
                    ownMessageSent={ownMessageSent}
                    isLastPageInChat={isLastPageInChat}
                    containerHeight={containerHeight}
                    isSingleChat={isSingleChat}
                    handleSearch={handleMessagesSearch}
                    selectedChatId={selectedChatId}
                />
            ) : (
                <ChatPlaceholder className={classes.chatPlaceholder}/>
            )}
        </div>
    )
}

Chat.propTypes = {
    chat: PropTypes.object,
    isSingleChat: PropTypes.bool,
    containerHeight: PropTypes.string,
    authUser: PropTypes.string.isRequired,
    chats: PropTypes.array,
    getAllChats: PropTypes.func.isRequired,
    getChat: PropTypes.func.isRequired,
    chatMessages: PropTypes.array,
    getMessagesForChat: PropTypes.func.isRequired,
    messagesLoading: PropTypes.bool,
    ownMessageSent: PropTypes.bool,
    chatsLoading: PropTypes.bool,
    isLastPageInChat: PropTypes.bool,
    unreadChats: PropTypes.array
}

const mapStateToProps = state => ({
    authUser: state.auth.user.username,
    chats: state.chat.chats,
    chat: state.chat.chat,
    chatsLoading: state.chat.chatsLoading,
    chatMessages: state.chat.chatMessages,
    messagesLoading: state.chat.messagesLoading,
    ownMessageSent: state.chat.ownMessageSent,
    isLastPageInChat: state.chat.isLastPageInChat,
    unreadChats: state.chat.unreadChats
})

export default connect(mapStateToProps, {getAllChats, getMessagesForChat, getChat})(Chat)
