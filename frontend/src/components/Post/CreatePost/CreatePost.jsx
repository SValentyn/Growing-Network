/* global URL */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import {
    Avatar,
    Button,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core'
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import { Toastr } from '../../../utils/toastr/Toastr'
import TagFriendButton from '../TagFriendButton/TagFriendButton'
import { createPost, uploadImages } from '../../../actions/post'
import { getAvatarLink, resetFileInput } from '../../../utils/helpers/imageHelper'
import { loadCurrentUserFriends } from '../../../actions/friends'

import useStyles from './createPostStyles'
import { getAvatarColorHex, getFirstChars } from '../../../utils/helpers/commonFormatter'

const FRIENDS_INITIAL_SIZE = 16
const STARTING_PAGE = 0

const CreatePost = ({ profileOwner, currentUser, currentUserFriends, loadCurrentUserFriends }) => {
    const classes = useStyles()
    const { firstName, username } = currentUser
    const profileOwnerUsername = profileOwner.username

    const [uploadForm, setUploadForm] = useState({
        imagesToUpload: [],
        textToUpload: '',
        taggedFriends: []
    })

    const getCurrentUserFriends = () => {
        if (currentUserFriends.length === 0) {
            loadCurrentUserFriends(username, STARTING_PAGE, FRIENDS_INITIAL_SIZE)
        }
    }

    const {
        imagesToUpload,
        textToUpload,
        taggedFriends
    } = uploadForm

    const handleSubmit = (e) => {
        e.preventDefault()
        if (imagesToUpload.length > 1) {
            Toastr.error('The system does not support uploading multiple files 🙄')
        } else {
            uploadImages(imagesToUpload).then(
                imgLinks => createPost(profileOwnerUsername, textToUpload, imgLinks, taggedFriends, true),
                images => {
                    Toastr.error('Unable to upload image. Please try again.')
                    setUploadForm({ ...uploadForm, imagesToUpload: images })
                })
        }
    }

    const handleKeyPress = (e) => {
        if ((e.ctrlKey) && (e.which === 13)) {
            handleSubmit(e)
        }
    }

    const handleTextInputChange = (e) => {
        setUploadForm({ ...uploadForm, textToUpload: e.target.value })
    }

    const handleFileInputChange = (e) => {
        let addedUrls = [].map.call(e.target.files, file => ({
            file,
            url: URL.createObjectURL(file),
            uploadError: false
        }))
        setUploadForm({ ...uploadForm, imagesToUpload: imagesToUpload.concat(addedUrls) })
        resetFileInput(e)
    }

    const handleFriendTag = userLabel => {
        if (taggedFriends.some(u => u.username === userLabel.username)) {
            setUploadForm({
                ...uploadForm,
                taggedFriends: taggedFriends.filter(u => u.username !== userLabel.username)
            })
        } else {
            setUploadForm({
                ...uploadForm,
                taggedFriends: taggedFriends.concat(userLabel)
            })
        }
    }

    const removeImage = (url) => {
        const filteredImages = imagesToUpload.filter(img => img.url !== url)
        setUploadForm({ ...uploadForm, imagesToUpload: filteredImages })
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
        <div className={classes.container}>
            <Typography variant="subtitle1" component="div" className={classes.header}>
                Post something!
            </Typography>
            <form className={classes.form}>
                <Grid container className={classes.textContainer}>
                    <Grid container item xs={2} lg={1} justify="center">
                        <Link to={`/profile/${get(currentUser, 'username')}`} className={classes.userLink}>
                            <Avatar src={getAvatarLink(currentUser)} className={classes.userPhoto} alt=""
                                    style={{ backgroundColor: getAvatarColorHex(currentUser) }}>
                                {getFirstChars(currentUser)}
                            </Avatar>
                        </Link>
                    </Grid>
                    <Grid item xs={10} lg={11}>
                        <TextField
                            className={classes.postInput}
                            style={{ fontFamily: 'Montserrat, Poppins, Open Sans Condensed, sans-serif' }}
                            autoComplete="lastName"
                            name="lastName"
                            variant="outlined"
                            placeholder={'What\'s on your mind, ' + firstName + '?'}
                            rows="2"
                            onKeyPress={handleKeyPress}
                            onChange={handleTextInputChange}
                            multiline
                            required
                            fullWidth
                            InputProps={{
                                classes: {
                                    inputMultiline: classes.inputMultiline,
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                        />
                        <GridList spacing={3} cellHeight={80} cols={5} className={classes.imgPreviewContainer}>
                            {images}
                        </GridList>
                        <p className={classes.footerText}>Press Ctrl+Enter to send</p>
                    </Grid>
                </Grid>
                <Grid container className={classes.toolsContainer}>
                    <Grid item xs={10}>
                        <Button className={classes.button} cursor="true">
                            <label htmlFor="file_upload" className={classes.label}>
                                <CropOriginalOutlinedIcon className={classes.icon}/>
                                <div className={classes.labelText}> Add image</div>
                            </label>
                            <input id="file_upload"
                                   className={classes.fileInput}
                                   multiple
                                   type="file"
                                   onChange={handleFileInputChange}
                            />
                        </Button>
                        <TagFriendButton
                            friends={currentUserFriends}
                            selected={taggedFriends}
                            getFriendsToTag={getCurrentUserFriends}
                            handleFriendTag={handleFriendTag}
                        />
                    </Grid>
                    <Grid container item xs={2} justify="flex-end">
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            POST
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

CreatePost.propTypes = {
    profileOwner: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    currentUserFriends: PropTypes.array.isRequired,
    loadCurrentUserFriends: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    currentUserFriends: state.friends.currentUserFriends
})

const mapDispatchToProps = (dispatch) => ({
    loadCurrentUserFriends: (username, page, size) => dispatch(loadCurrentUserFriends(username, page, size))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
