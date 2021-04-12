import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    Button,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    IconButton,
    MenuList,
    Paper,
    Popper,
    Slide
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import BrushIcon from '@material-ui/icons/Brush'
import LabelOffIcon from '@material-ui/icons/LabelOff'
import MenuItem from '@material-ui/core/MenuItem'

import useStyles from './postMenuStyles'
import {deleteCurrentUserTagFromPost, deletePost} from '../../../../actions/post'
import {get} from 'lodash'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const PostMenu = ({
    postId,
    author,
    owner,
    user,
    taggedUsers,
    deletePost,
    deleteCurrentUserTagFromPost,
    updateRef,
    openUpdateWindow,
    handleToggleUpdate
}) => {
    const classes = useStyles()

    const authorUsername = get(author, 'username')
    const ownerUsername = get(owner, 'username')
    const userUsername = get(user, 'username')

    // Menu dropdown
    const [open, setOpen] = useState(false)
    const [shownMenuItems, setShownMenuItems] = useState({
        deleteMenuItem: false,
        editMenuItem: false,
        removeTagMenuItem: false
    })

    const {
        deleteMenuItem,
        editMenuItem,
        removeTagMenuItem
    } = shownMenuItems

    useEffect(() => {
            setShownMenuItems({
                deleteMenuItem: authorUsername === userUsername || ownerUsername === userUsername,
                editMenuItem: authorUsername === userUsername,
                removeTagMenuItem: taggedUsers.some(taggedUser => get(taggedUser, 'username') === userUsername)
            })
        },
        [authorUsername, ownerUsername, userUsername, taggedUsers])
    const anchorRef = React.useRef(null)

    const handleToggle = (e) => {
        e.preventDefault()
        setOpen(prevOpen => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false)
    }

    const deleteTag = () => {
        deleteCurrentUserTagFromPost(postId, userUsername)
        setOpen(!open)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    // Delete post dialog
    const [openDialog, setOpenDialog] = useState(false)

    const handleModal = () => {
        setOpenDialog(!openDialog)
    }

    const handleModalDelete = () => {
        handleModal()
        deletePost(postId)
    }

    const deletePostDialog =
        <Dialog open={openDialog} onClose={handleModal}
                className={classes.dialog}
                TransitionComponent={Transition}
                keepMounted
        >
            <div className={classes.container}>
                <DialogTitle id="alert">Delete Post?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to permanently remove this post from Growing Network?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.btnMenu}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleModal}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleModalDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </div>
        </Dialog>

    return (
        <div>
            <IconButton
                href={'/'}
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                aria-label="menu"
                className={classes.btnMenu}
            >
                <MoreHorizIcon/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition placement="top">
                {({TransitionProps}) => (
                    <Grow className={classes.grow}
                          {...TransitionProps}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {deleteMenuItem &&
                                    <MenuItem onClick={handleModal}>
                                        <DeleteIcon className={classes.menuItemIcon}/>
                                        Delete post
                                    </MenuItem>}
                                    {editMenuItem &&
                                    <MenuItem
                                        ref={updateRef}
                                        aria-controls={openUpdateWindow ? 'updating-post' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleUpdate}
                                    >
                                        <BrushIcon className={classes.menuItemIcon}/>
                                        Edit post
                                    </MenuItem>}
                                    {removeTagMenuItem &&
                                    <MenuItem onClick={deleteTag}>
                                        <LabelOffIcon className={classes.menuItemIcon}/>
                                        Remove yourself from post
                                    </MenuItem>}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            {deletePostDialog}
        </div>
    )
}

PostMenu.propTypes = {
    postId: PropTypes.number.isRequired,
    author: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    taggedUsers: PropTypes.array.isRequired,
    deleteCurrentUserTagFromPost: PropTypes.func.isRequired,
    updateRef: PropTypes.object.isRequired,
    openUpdateWindow: PropTypes.bool.isRequired,
    handleToggleUpdate: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
    deletePost: postId => dispatch(deletePost(postId)),
    deleteCurrentUserTagFromPost: (postId, userUsername) => dispatch(deleteCurrentUserTagFromPost(postId, userUsername))
})

export default connect(null, mapDispatchToProps)(PostMenu)
