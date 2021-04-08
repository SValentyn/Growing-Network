import {
    CHAT_HAS_BEEN_READ,
    CHAT_PAGE_LEFT,
    CHAT_RECEIVED,
    CHATS_RECEIVED,
    CURRENT_CHAT_MESSAGE_RECEIVED,
    MESSAGES_RECEIVED,
    NEW_UNREAD_MESSAGE,
    RESET_RECEIVED_MESSAGES,
    START_LOADING_CHAT,
    START_LOADING_CHATS,
    START_LOADING_MESSAGES,
    STOP_LOADING_CHAT,
    STOP_LOADING_CHATS,
    STOP_LOADING_MESSAGES,
    UNREAD_CHATS_RECEIVED
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const getAllChats = () => async dispatch => {
    dispatch({
        type: START_LOADING_CHATS
    })

    apiRequest.get('/chats', null, true)
        .then(res => {
                dispatch({
                    type: CHATS_RECEIVED,
                    payload: res
                })
            }
        )
        .catch(() => dispatch({
            type: STOP_LOADING_CHATS
        }))
}

export const getMessagesForChat = (chatId, page, size, isInitialRequest) => async dispatch => {
    dispatch({
        type: START_LOADING_MESSAGES
    })

    if (isInitialRequest) {
        dispatch({
            type: RESET_RECEIVED_MESSAGES
        })
    }

    apiRequest.get(`/messages/${chatId}`, {params: {page, size}})
        .then(res => {
                dispatch({
                    type: MESSAGES_RECEIVED,
                    payload: res
                })
            }
        )
        .catch(() => dispatch({
            type: STOP_LOADING_MESSAGES
        }))
}

export const sendMessage = ({chatId, text}) => (
    apiRequest.post('/messages/add', {chatId, text})
)

export const addMessageToCurrentChat = msg => dispatch => {
    dispatch({
        type: CURRENT_CHAT_MESSAGE_RECEIVED,
        payload: msg
    })
}

export const clearCurrentChatMessages = () => dispatch =>
    dispatch({
        type: CHAT_PAGE_LEFT
    })

export const getChat = userId => async dispatch => {
    dispatch({
        type: START_LOADING_CHAT
    })
    apiRequest.get(`/chats/${userId}`, null, true)
        .then(res => {
                dispatch({
                    type: CHAT_RECEIVED,
                    payload: res
                })
            }
        )
        .catch(() => dispatch({
            type: STOP_LOADING_CHAT
        }))
}

export const getUnreadChats = () => dispatch => {
    apiRequest.get('/messages/unread')
        .then(unread => dispatch({
            type: UNREAD_CHATS_RECEIVED,
            payload: unread
        }))
}

export const saveMessageNotification = (msg, unreadChats) => dispatch => {
    const alreadyInUnread = unreadChats.find(unread => unread.chatId === msg.chat.id)
    const unreadChat = {
        chatId: msg.chat.id,
        lastUpdate: msg.date,
        unreadMessages: alreadyInUnread ? alreadyInUnread.unreadMessages.concat(msg) : [msg]
    }
    dispatch({
        type: NEW_UNREAD_MESSAGE,
        payload: unreadChat
    })
}

export const sendChatBeenReadNotification = chatId => dispatch => {
    apiRequest.put(`/messages/unread/${chatId}`)
        .then(readChatId => dispatch({
            type: CHAT_HAS_BEEN_READ,
            payload: readChatId
        }))
}
