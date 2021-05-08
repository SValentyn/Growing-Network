import React, {Fragment, useRef, useState} from 'react'
import Paper from '@material-ui/core/Paper'
import {Dialog, Slide} from '@material-ui/core'
import PropTypes from 'prop-types'
import {get} from 'lodash'

import PostAuthor from './PostAuthor/PostAuthor'
import PostLikePanel from './PostLikePanel/PostLikePanel'
import PostComments from './PostComments/PostComments'
import UpdatePost from './UpdatePost/UpdatePost'

import useStyles from './postStyles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const Post = ({post}) => {
    const classes = useStyles()

    const {id, author, owner, date, message, image, likes, comments, taggedFriends} = post

    const inputRef = useRef(null)
    const focusForCreatingComment = () => {
        inputRef.current.focus()
    }

    // Open image
    const [openDialog, setOpenDialog] = useState(false)
    const handleModal = () => {
        setOpenDialog(!openDialog)
    }

    // Update post dialog
    const [openUpdateWindow, setOpenUpdateWindow] = useState(false)
    const updateRef = React.useRef(null)

    const handleToggleUpdate = (e) => {
        e.preventDefault()
        setOpenUpdateWindow(prevOpen => !prevOpen)
    }

    return (
        <Paper key={id} className={classes.post} elevation={1}>
            <PostAuthor
                postId={id}
                author={author}
                owner={owner}
                date={date}
                taggedFriends={taggedFriends}
                updateRef={updateRef}
                openUpdateWindow={openUpdateWindow}
                handleToggleUpdate={handleToggleUpdate}
            />
            {message && <p className={classes.postText}>{message}</p>}
            {image &&
            <Fragment>
                <div className={classes.imageContainer}>
                    <img src={get(image, 'src')} onClick={handleModal} className={classes.image} alt="Post image"/>
                </div>
                <Dialog
                    maxWidth="md"
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleModal}
                >
                    <img className={classes.image} src={get(image, 'src')} onClick={handleModal} alt=""/>
                </Dialog>
            </Fragment>
            }
            <PostLikePanel postId={id} likes={likes} comments={comments}
                           focusForCreatingComment={focusForCreatingComment}/>
            <PostComments postId={id} postOwner={owner} comments={comments} inputRef={inputRef}/>
            <UpdatePost
                post={post}
                openUpdateWindow={openUpdateWindow}
                setOpenUpdateWindow={setOpenUpdateWindow}
                updateRef={updateRef}
            />
        </Paper>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired
}

export default Post
