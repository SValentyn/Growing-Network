import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {sortBy} from 'lodash'
import classnames from 'classnames'

import ChatMessage from '../ChatMessage/ChatMessage'
import InfiniteScroll from '../../../InfiniteScroll/InfiniteScroll'

import useStyles from './chatMessagesStyles'

const MESSAGES_PAGE_SIZE = 12

const ChatMessages = ({
    authUser,
    messages,
    className,
    messagesLoading,
    loadContentHandler,
    ownMessageSent,
    isLastPageInChat,
    isChatGrouped
}) => {
    const classes = useStyles()
    const scrollToBottom = () => {
        ChatMessages.messagesEnd.scrollIntoView({behavior: 'smooth'})
    }
    useEffect(() => {
        if (ownMessageSent) {
            scrollToBottom()
        }
    })
    const sortedMessages = sortBy(messages, ['date'])

    return (
        <InfiniteScroll
            isReverseDirection
            contentIsLoading={messagesLoading}
            contentArrLength={messages.length}
            loadContentHandler={loadContentHandler}
            pageSize={MESSAGES_PAGE_SIZE}
            throttleDelay={1000}
            isLastPage={isLastPageInChat}
            isContentUpdated={ownMessageSent}
            scrollContainerStyles={{
                flex: '1 1 auto',
                minHeight: 0,
                overflowX: 'hidden',
                overflowY: 'scroll'
            }}
        >
            <div
                className={classnames(classes.root, className)}>
                <div className={classes.inner}>
                    {sortedMessages
                        .map(message =>
                            <ChatMessage
                                key={message.id}
                                message={message}
                                authUser={authUser}
                                isChatGrouped={isChatGrouped}
                            />
                        )}
                </div>
                <div style={{float: 'left', clear: 'both'}}
                     ref={(el) => { ChatMessages.messagesEnd = el }}/>
            </div>
        </InfiniteScroll>
    )
}

ChatMessages.propTypes = {
    authUser: PropTypes.string.isRequired,
    className: PropTypes.string,
    messages: PropTypes.array.isRequired,
    messagesLoading: PropTypes.bool,
    loadContentHandler: PropTypes.func.isRequired,
    ownMessageSent: PropTypes.bool,
    isLastPageInChat: PropTypes.bool,
    isChatGrouped: PropTypes.bool.isRequired
}

export default ChatMessages
