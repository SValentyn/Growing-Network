import React, {useEffect, useState} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {find, get} from 'lodash'
import {Divider, Input, List, Paper, Toolbar} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import Preloader from '../../Preloader/Preloader'
import ChatListItem from './ChatListItem'

import useStyles from './ChatListStyles'

const ChatList = ({
    className,
    chats,
    chatsLoading,
    selectedChatId,
    authUser,
    unreadChats,
    handleSearch
}) => {
    useEffect(() => {
        setInputValue('')
    }, [selectedChatId])

    const classes = useStyles()
    const [inputValue, setInputValue] = useState('')
    const getUnreadMessagesCount = chatId => get(find(unreadChats, {chatId}), 'unreadMessages.length')
    const handleInputChange = evt => {
        setInputValue(evt.target.value)
        handleSearch(evt.target.value)
    }

    return (
        <div
            className={classnames(classes.root, className)}
        >
            <Toolbar>
                <Paper className={classes.search}>
                    <SearchIcon className={classes.searchIcon}/>
                    <Input
                        className={classes.searchInput}
                        disableUnderline
                        placeholder="Search chat"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </Paper>
            </Toolbar>
            <Divider/>
            {chatsLoading ? <Preloader/> : <List disablePadding className={classes.chatListContainer}>
                {chats.map((chat, i) => (
                    <ChatListItem
                        active={chat.id === selectedChatId}
                        chat={chat}
                        divider={i < chats.length - 1}
                        key={chat.id}
                        messagesLoading={chatsLoading}
                        authUser={authUser}
                        unreadMessagesCount={getUnreadMessagesCount(chat.id)}
                    />
                ))}
            </List>}
        </div>
    )
}

ChatList.propTypes = {
    className: PropTypes.string,
    chats: PropTypes.array.isRequired,
    chatsLoading: PropTypes.bool,
    selectedChatId: PropTypes.number,
    authUser: PropTypes.string.isRequired,
    unreadChats: PropTypes.array,
    handleSearch: PropTypes.func.isRequired
}

export default ChatList
