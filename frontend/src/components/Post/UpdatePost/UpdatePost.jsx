/* global URL */
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {get} from 'lodash'
import {
    Avatar,
    Button,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    Grow,
    IconButton,
    Paper,
    Popper,
    TextField,
    Typography
} from '@material-ui/core'
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import TagFriendButton from '../CreatePost/TagFriendButton/TagFriendButton'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {loadCurrentUserFriends} from '../../../actions/friends'

import useStyles from './updatePostStyles'
import {updatePost, uploadImages} from '../../../actions/post'
import {Toastr} from '../../../utils/toastr/Toastr'

const FRIENDS_INITIAL_SIZE = 10
const STARTING_PAGE = 0

const UpdatePost = ({
    post,
    openUpdateWindow,
    setOpenUpdateWindow,
    updateRef,
    currentUser,
    currentUserFriends,
    loadCurrentUserFriends,
    updatePost
}) => {
    const classes = useStyles()
    const {id, message, image, taggedFriends} = post
    const {firstName, username} = currentUser

    const [uploadForm, setUploadForm] = useState({
        imagesToUpload: image ? [{id: image.id, url: image.src}] : [],
        textToUpload: message,
        taggedFriendsToUpload: taggedFriends
    })

    const getCurrentUserFriends = () => {
        if (currentUserFriends.length === 0) {
            loadCurrentUserFriends(username, STARTING_PAGE, FRIENDS_INITIAL_SIZE)
        }
    }

    const {
        imagesToUpload,
        textToUpload,
        taggedFriendsToUpload
    } = uploadForm

    const handleClose = (event) => {
        if (updateRef.current && updateRef.current.contains(event.target)) {
            return
        }
        setOpenUpdateWindow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpenUpdateWindow(false)
        if (imagesToUpload.length === 0) {
            updatePost(id, textToUpload, imagesToUpload, taggedFriendsToUpload, true)
        } else if (image && imagesToUpload[0].url === image.src) {
            updatePost(id, textToUpload, [image], taggedFriendsToUpload, true)
        } else {
            uploadImages(imagesToUpload).then(
                (imgLinks) => updatePost(id, textToUpload, imgLinks, taggedFriendsToUpload, true),
                (images) => {
                    Toastr.error('One or more images weren\'t uploaded')
                    setUploadForm({...uploadForm, imagesToUpload: images})
                })
        }
    }

    const handleKeyPress = (e) => {
        if ((e.ctrlKey) && (e.which === 13)) {
            handleSubmit(e)
        }
    }

    const handleTextInputChange = (e) => {
        setUploadForm({...uploadForm, textToUpload: e.target.value})
    }

    const handleFileInputChange = (e) => {
        let addedUrls = [].map.call(e.target.files, file => ({
            file,
            url: URL.createObjectURL(file),
            uploadError: false
        }))
        setUploadForm({...uploadForm, imagesToUpload: imagesToUpload.concat(addedUrls)})
    }

    const handleFriendTag = (userLabel) => {
        if (taggedFriendsToUpload.some(u => u.username === userLabel.username)) {
            setUploadForm({
                ...uploadForm,
                taggedFriendsToUpload: taggedFriendsToUpload.filter(u => u.username !== userLabel.username)
            })
        } else {
            setUploadForm({
                ...uploadForm,
                taggedFriendsToUpload: taggedFriendsToUpload.concat(userLabel)
            })
        }
    }

    const removeImage = (url) => {
        const filteredImages = imagesToUpload.filter(img => img.url !== url)
        setUploadForm({...uploadForm, imagesToUpload: filteredImages})
    }

    const images = imagesToUpload.map((img, index) => (
        <GridListTile key={img.url} className={img.uploadError ? classes.errorImg : null} cols={1}>
            <img src={img.url} alt={'userImage' + index}/>
            <GridListTileBar
                titlePosition="top"
                actionIcon={
                    <IconButton
                        onClick={() => removeImage(img.url)}
                        className={classes.iconButton}
                        size="small">
                        <CloseOutlinedIcon/>
                    </IconButton>
                }
                className={classes.titleBar}
                actionPosition="right"
            />
        </GridListTile>
    ))

    return (
        <Popper open={openUpdateWindow} anchorEl={updateRef.current} role={undefined} transition>
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{transformOrigin: placement === 'bottom' ? 'top' : 'bottom'}}
                >
                    <Paper className={classes.container} id="updating-post">
                        <Typography variant="subtitle1" component="div" className={classes.header}>
                            Update post
                        </Typography>
                        <form className={classes.form}>
                            <Grid container className={classes.textContainer}>
                                <Grid container item xs={2} lg={1} justify="center" alignItems="flex-start">
                                    <Link to={`/profile/${get(currentUser, 'username')}`}>
                                        <Avatar className={classes.avatar} src={getAvatarLink(currentUser)}/>
                                    </Link>
                                </Grid>
                                <Grid item xs={10} lg={11}>
                                    <TextField
                                        className={classes.postInput}
                                        value={textToUpload}
                                        autoComplete="lastName"
                                        name="lastName"
                                        variant="outlined"
                                        placeholder={'What you\'d like to share, ' + firstName + '?'}
                                        rows="2"
                                        onKeyPress={handleKeyPress}
                                        onChange={handleTextInputChange}
                                        multiline
                                        required
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                    <GridList spacing={3} cellHeight={80} cols={5}
                                              className={classes.imgPreviewContainer}>
                                        {images}
                                    </GridList>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.toolsContainer}>
                                <Grid item xs={8}>
                                    <Button color="primary" className={classes.button}>
                                        <label htmlFor="updated_file_upload" className={classes.label}>
                                            <CropOriginalOutlinedIcon className={classes.icon}/>
                                            <div className={classes.labelText}> Add image</div>
                                        </label>
                                        <input id="updated_file_upload"
                                               className={classes.fileInput}
                                               multiple
                                               type="file"
                                               onChange={handleFileInputChange}/>
                                    </Button>
                                    <TagFriendButton
                                        getFriendsToTag={getCurrentUserFriends}
                                        friends={currentUserFriends}
                                        selected={taggedFriendsToUpload}
                                        handleFriendTag={handleFriendTag}/>
                                </Grid>
                                <Grid container item xs={4} justify="flex-end">
                                    <Button className={classes.button} variant="contained" onClick={handleClose} style={{padding: '0 10px'}}>
                                        Cancel
                                    </Button>
                                    <Button className={classes.button} type="submit" variant="contained"
                                            color="primary" onClick={handleSubmit}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}

UpdatePost.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    currentUserFriends: PropTypes.array.isRequired,
    loadCurrentUserFriends: PropTypes.func.isRequired,
    openUpdateWindow: PropTypes.bool.isRequired,
    setOpenUpdateWindow: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    updateRef: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
    currentUserFriends: state.friends.currentUserFriends
})

const mapDispatchToProps = dispatch => ({
    loadCurrentUserFriends: (username, page, size) => dispatch(loadCurrentUserFriends(username, page, size)),
    updatePost: (postId, message, images, taggedFriends, isShownToEveryone) => dispatch(updatePost(postId, message, images, taggedFriends, isShownToEveryone))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost)
