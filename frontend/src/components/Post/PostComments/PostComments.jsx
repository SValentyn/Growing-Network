import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {get} from 'lodash'
import {Avatar, Grid, TextField} from '@material-ui/core'

import Comment from './Comment/Comment'
import {createComment} from '../../../actions/post'

import useStyles from './postCommentsStyles'

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

    const commentList = comments.map(comment => <Comment postId={postId} postOwner={postOwner} comment={comment}
                                                         key={get(comment, 'id')}/>)

    return (
        <Fragment>
            <div className={classes.comments}>
                {commentList}
            </div>
            <Grid container className={classes.createPanel}>
                <Grid container item xs={2} lg={1} justify="center" alignItems="flex-start">
                    <Avatar className={classes.avatar} src={get(user.avatar, 'src')}/>
                </Grid>
                <Grid item xs={10} lg={11}>
                    <TextField
                        className={classes.createInput}
                        variant="outlined"
                        placeholder="Write a comment..."
                        multiline
                        fullWidth
                        value={value}
                        onChange={handleTextFieldChange}
                        onKeyPress={handleKeyPress}
                        inputRef={inputRef}
                        InputProps={{
                            classes: {
                                inputMultiline: classes.inputMultiline,
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline
                            }
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
