import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import {Avatar, IconButton, Input, Paper, Tooltip} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'

import {getAvatarLink} from '../../../../utils/helpers/imageHelper'
import {sendMessage} from '../../../../actions/chat'

import useStyles from './sendMessageStyles'
import withStyles from '@material-ui/core/styles/withStyles'

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'unset',
        padding: 0,
        '& .emoji-mart': {
            right: -114,
            bottom: 80,
            position: 'absolute',
            minWidth: '319px !important',
            maxWidth: '319px !important'
        },
        '& .emoji-mart-scroll': {
            height: '240px'
        },
        '& .emoji-mart-emoji': {
            outline: 'none'
        },
        '& .emoji-mart-anchor-selected': {
            color: 'black !important'
        },
        '& .emoji-mart-anchor-bar': {
            backgroundColor: 'black !important'
        }
    },
    arrow: {
        color: theme.palette.common.white,
    },
}))(Tooltip)

const SendMessage = ({authUser, chatId}) => {
    const classes = useStyles()
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSubmit = () => {
        if (value) {
            sendMessage({chatId, text: value})
            setValue('')
        }
    }

    const handleKeyPress = (e) => {
        if (!value && e.key === 'Enter') {
            e.preventDefault()
        }

        if (e.key === 'Enter' && value) {
            e.preventDefault()
            sendMessage({chatId, text: value})
            setValue('')
        }
    }

    return (
        <div className={classes.root}>
            <Avatar src={getAvatarLink(authUser)} alt=""/>
            <Paper className={classes.paper}>
                <Input disableUnderline
                       multiline
                       fullWidth
                       value={value}
                       onChange={handleChange}
                       onKeyPress={handleKeyPress}
                       placeholder="Write a message..."
                       autoFocus
                />
            </Paper>

            <HtmlTooltip disableFocusListener interactive arrow
                         title={
                             <React.Fragment>
                                 <Picker id="picker"
                                         perLine={8}
                                         set={'apple'}
                                         theme={'light'}
                                         notfound={'No Emoji Found'}
                                         emojiTooltip={false}
                                         showPreview={false}
                                         showSkinTones={false}
                                         autoFocus={false}
                                         onSelect={emoji => setValue(value + emoji.native)}
                                 />
                             </React.Fragment>
                         }
            >
                <IconButton color={value.length > 0 ? 'primary' : 'default'}
                            className={classes.iconContainerWithoutHover}>
                    <EmojiEmotionsOutlinedIcon className={classes.icon}/>
                </IconButton>
            </HtmlTooltip>

            <IconButton onClick={handleSubmit} color={value.length > 0 ? 'primary' : 'default'}>
                <SendIcon className={classes.icon}/>
            </IconButton>
        </div>
    )
}

SendMessage.propTypes = {
    authUser: PropTypes.object.isRequired,
    chatId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    authUser: state.auth.user
})

export default connect(mapStateToProps, null)(SendMessage)
