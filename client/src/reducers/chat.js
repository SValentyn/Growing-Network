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
import {addPagedPayload, addPayloadIfNotInStore} from '../utils/helpers/payloadAdapter'
import {orderBy} from 'lodash'

const initialState = {
    chats: [],
    chatsLoading: false,
    chatMessages: [],
    messagesLoading: false,
    ownMessageSent: false,
    isLastPageInChat: false,
    chatLoading: false,
    chat: {},
    unreadChats: [],
    openChatId: null
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch (type) {
        case START_LOADING_CHATS:
            return {...state, chatsLoading: true}

        case START_LOADING_MESSAGES:
            return {...state, messagesLoading: true}

        case STOP_LOADING_CHATS:
            return {...state, chatsLoading: false}

        case STOP_LOADING_MESSAGES:
            return {...state, messagesLoading: false}

        case CHATS_RECEIVED:
            return {
                ...state,
                chats: orderBy(payload, ['lastMessage.date'], ['desc']),
                chatsLoading: false,
                ownMessageSent: false
            }

        case MESSAGES_RECEIVED:
            return {
                ...state,
                chatMessages: addPagedPayload(state.chatMessages, payload.content.reverse(), 'id'),
                messagesLoading: false,
                ownMessageSent: false,
                isLastPageInChat: payload.last
            }

        case RESET_RECEIVED_MESSAGES:
            return {...state, chatMessages: []}

        case CURRENT_CHAT_MESSAGE_RECEIVED:
            return {
                ...state,
                chatMessages: [payload, ...state.chatMessages.reverse()],
                ownMessageSent: true
            }

        case CHAT_PAGE_LEFT:
            return {
                ...state,
                chatMessages: [],
                openChatId: null
            }

        case START_LOADING_CHAT:
            return {...state, chatLoading: true}

        case STOP_LOADING_CHAT:
            return {...state, chatLoading: false}

        case CHAT_RECEIVED:
            return {
                ...state,
                chat: payload,
                chats: addPayloadIfNotInStore(state.chats, payload, 'id'),
                chatLoading: false
            }

        case CHAT_HAS_BEEN_READ:
            return {
                ...state,
                unreadChats: state.unreadChats.filter(unread => unread.chatId !== payload),
                openChatId: payload
            }

        case UNREAD_CHATS_RECEIVED:
            return {
                ...state,
                unreadChats: payload
            }

        case NEW_UNREAD_MESSAGE:
            return {
                ...state,
                unreadChats: state.unreadChats.filter(unread => unread.chatId !== payload.chatId).concat(payload)
            }

        default:
            return {...state}
    }
}
