import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {Avatar, Grid, IconButton, InputAdornment, TextField} from '@material-ui/core'

import Comment from './Comment/Comment'
import {createComment} from '../../../actions/post'

import useStyles from './postCommentsStyles'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getAvatarColorHex, getFirstChars} from '../../../utils/helpers/commonFormatter'
import NimblePicker from 'emoji-mart/dist-modern/components/picker/nimble-picker'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
import {HtmlTooltip} from '../../Chat/ChatDetails/SendMessage/HtmlTooltip'
import data from 'emoji-mart/data/google.json'

const PostComments = ({postId, comments, postOwner, user, createComment, inputRef}) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const handleTextFieldChange = (e) => {
        setValue(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
            e.preventDefault()
            let comment = e.target.value
            createComment(postId, comment)
            setValue('')
        }
    }

    const commentList = comments.map(comment =>
        (<Comment postId={postId} postOwner={postOwner} comment={comment} key={get(comment, 'id')}/>))

    return (
        <Fragment>
            <div className={classes.comments}>
                {commentList}
            </div>
            <Grid container className={classes.createPanel}>
                <Grid item xs={12} style={{marginTop: 1}}>
                    <TextField
                        className={classes.createInput}
                        placeholder="Write a comment..."
                        multiline
                        value={value}
                        onChange={handleTextFieldChange}
                        onKeyPress={handleKeyPress}
                        inputRef={inputRef}
                        style={{width: '97%'}}
                        InputProps={{
                            classes: {
                                inputMultiline: classes.inputMultiline,
                                root: classes.cssOutlinedInput
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Avatar src={getAvatarLink(user)} className={classes.userPhoto} alt=""
                                            style={{backgroundColor: getAvatarColorHex(user)}}>
                                        {getFirstChars(user)}
                                    </Avatar>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start" style={{margin: 0}}>
                                    <HtmlTooltip disableFocusListener interactive arrow
                                                 style={{padding: 0}}
                                                 title={
                                                     <React.Fragment>
                                                         <NimblePicker
                                                             id="picker"
                                                             data={data}
                                                             perLine={6}
                                                             emojiSize={20}
                                                             theme={'light'}
                                                             color={'black'}
                                                             notfound={'No Emoji Found'}
                                                             native={true}
                                                             emojiTooltip={false}
                                                             showPreview={false}
                                                             showSkinTones={false}
                                                             autoFocus={false}
                                                             style={{right: -149, bottom: 52}}
                                                             onSelect={emoji => setValue(value + emoji.native)}
                                                         />
                                                     </React.Fragment>
                                                 }
                                    >
                                        <IconButton className={classes.iconEmojiPickerContainerWithoutHover}>
                                            <EmojiEmotionsOutlinedIcon className={classes.iconEmojiPicker}/>
                                        </IconButton>
                                    </HtmlTooltip>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}

PostComments.propTypes = {
    postId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    postOwner: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    createComment: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {createComment})(PostComments)
