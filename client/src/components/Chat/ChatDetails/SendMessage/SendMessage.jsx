import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Avatar, IconButton, Input, Paper, Tooltip} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import {getAvatarLink} from '../../../../utils/helpers/imageLinkHelpers'
import {sendMessage} from '../../../../actions/chat'

import useStyles from './sendMessageStyles'

const SendMessage = ({authUser, chatId}) => {
    const classes = useStyles()
    const [value, setValue] = useState('')

    const handleChange = event => {
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
            <Avatar
                alt="User avatar"
                src={getAvatarLink(authUser)}
            />
            <Paper className={classes.paper}>
                <Input
                    disableUnderline
                    multiline
                    fullWidth
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Write a message..."
                />
            </Paper>
            <Tooltip title="Send">
                <IconButton
                    onClick={handleSubmit}
                    color={value.length > 0 ? 'primary' : 'default'}>
                    <SendIcon/>
                </IconButton>
            </Tooltip>
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
