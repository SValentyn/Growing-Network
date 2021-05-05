import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import 'emoji-mart/css/emoji-mart.css'
import {Avatar, IconButton, Input, Paper, Tooltip} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'

import {getAvatarLink} from '../../../../utils/helpers/imageHelper'
import {sendMessage} from '../../../../actions/chat'

import useStyles from './sendMessageStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import NimblePicker from 'emoji-mart/dist-modern/components/picker/nimble-picker'
import data from 'emoji-mart/data/google.json'

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'unset',
        padding: 0,
        '& .emoji-mart': {
            right: -114,
            bottom: 80,
            position: 'absolute',
            minWidth: '321px !important',
            maxWidth: '321px !important'
        },
        '& .emoji-mart-scroll': {
            height: '240px'
        },
        '& .emoji-mart-emoji': {
            outline: 'none'
        },
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

    // let isShowScroll = false
    const handleKeyPress = (e) => {
        if ((e.ctrlKey) && (e.which === 13)) {
            let inputMessage = document.getElementById('inputMessage')
            inputMessage.value += '\n'
            inputMessage.blur()
            inputMessage.focus()
            inputMessage.selectionStart = inputMessage.value.length
        }

        if (!value && e.key === 'Enter') {
            e.preventDefault()
        }

        if (e.key === 'Enter' && value) {
            e.preventDefault()
            sendMessage({chatId, text: value})
            setValue('')
        }
    }

    const handleCheckHeight = () => {
        let inputContainer = document.getElementById('inputContainer')
        if (window.getComputedStyle(inputContainer).height.replace('px', '') > 255) {
            inputContainer.style.overflowY = 'scroll'
        } else {
            inputContainer.style.overflowY = 'hidden'
        }
    }

    return (
        <div className={classes.root}>
            <Avatar src={getAvatarLink(authUser)} alt=""/>
            <Paper id="inputContainer" className={classes.paper}>
                <Input id="inputMessage"
                       type="textarea"
                       disableUnderline
                       multiline
                       fullWidth
                       value={value}
                       onChange={handleChange}
                       onKeyPress={handleKeyPress}
                       onKeyDown={handleCheckHeight}
                       placeholder="Write a message..."
                       autoFocus
                       style={{whiteSpace: 'pre-line'}}
                />
            </Paper>

            <HtmlTooltip disableFocusListener interactive arrow
                         title={
                             <React.Fragment>
                                 <NimblePicker
                                     id="picker"
                                     data={data}
                                     perLine={8}
                                     set={'apple'}
                                     theme={'light'}
                                     color={'black'}
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
