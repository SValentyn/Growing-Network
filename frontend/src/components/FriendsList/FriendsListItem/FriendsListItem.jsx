import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {get} from 'lodash'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    Tooltip,
    Zoom
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import {confirmRequest, deleteFriend, deleteRequest} from '../../../actions/friends'
import {dateFormatter} from '../../../utils/helpers/dateFormatter'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getAvatarColorHex, getFirstChars, getFullName} from '../../../utils/helpers/commonFormatter'

import useStyles from './friendsListItemStyles'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const FriendsListItem = ({
    friend,
    deleteFriend,
    request,
    confirmRequest,
    deleteRequest,
    isOwnProfile
}) => {
    let avatarSrc = friend ? getAvatarLink(friend) : getAvatarLink(request.requester)
    const classes = useStyles({avatar: avatarSrc})
    const [openDialog, setOpenDialog] = useState(false)

    const handleModal = () => {
        setOpenDialog(!openDialog)
    }

    const handleModalDeleteFriend = friendUsername => {
        handleModal()
        deleteFriend(friendUsername)
    }

    const handleModalDeleteRequest = requestId => {
        handleModal()
        deleteRequest(requestId)
    }

    return (
        <Fragment>
            {friend &&
            <Grid item sm={3} className={classes.gridItem}>
                <Link to={`/profile/${get(friend, 'username')}`} className={classes.userLink}>
                    <Avatar src={getAvatarLink(friend)} alt=""
                            className={getAvatarLink(friend) !== null ? classes.avatar : classes.userPhoto}
                            style={{backgroundColor: getAvatarColorHex(friend)}}>
                        {getFirstChars(friend)}
                    </Avatar>
                </Link>
                <div className={classes.friendInfo}>
                    <Link to={`/profile/${get(friend, 'username')}`} className={classes.userLink}>
                        <p className={classes.userName}>{getFullName(friend)}</p>
                    </Link>
                    <div>
                        {isOwnProfile && <Tooltip title="Delete friend" TransitionComponent={Zoom} placement={'top'}>
                            <IconButton color="secondary" onClick={handleModal} aria-label="Delete friend"
                                        style={{padding: 8}}>
                                <HighlightOffIcon/>
                            </IconButton>
                        </Tooltip>}
                        <Dialog
                            open={openDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleModal}
                            className={classes.dialog}
                        >
                            <div className={classes.modalContainer}>
                                <DialogTitle id="alert">Delete friend</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete him/her from your friends?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className={classes.btnMenu}>
                                    <Button className={classes.modalButton} variant="contained" color="primary"
                                            onClick={handleModal}>
                                        Cancel
                                    </Button>
                                    <Button className={classes.modalButton} variant="contained" color="secondary"
                                            onClick={() => handleModalDeleteFriend(friend.username)}>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </Grid>
            }
            {request &&
            <Grid item sm={3} className={classes.gridItem}>
                <Link to={`/profile/${get(request.requester, 'username')}`} className={classes.userLink}>
                    <Avatar src={getAvatarLink(request.requester)} alt=""
                            className={getAvatarLink(request.requester) !== null ? classes.avatar : classes.userPhoto}
                            style={{backgroundColor: getAvatarColorHex(request.requester)}}>
                        {getFirstChars(request.requester)}
                    </Avatar>
                </Link>
                <div className={classes.friendInfo}>
                    <div>
                        <Link to={`/profile/${get(request.requester, 'username')}`} className={classes.userLink}>
                            <p className={classes.userName}>{getFullName(request.requester)}</p>
                        </Link>
                        <p className={classes.requestDate}>{dateFormatter(request.date)}</p>
                    </div>
                    <div>
                        <Tooltip title="Confirm request" TransitionComponent={Zoom} placement={'right'}>
                            <IconButton className={classes.confirmBtn}
                                        onClick={() => confirmRequest(request.id)} aria-label="Confirm">
                                <CheckCircleOutlineIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete request" className={classes.tooltipPlacementTop}
                                 TransitionComponent={Zoom} placement={'right'}>
                            <IconButton className={classes.deleteBtn}
                                        onClick={handleModal} aria-label="Delete">
                                <HighlightOffIcon/>
                            </IconButton>
                        </Tooltip>
                        <Dialog
                            open={openDialog}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleModal}
                        >
                            <div className={classes.modalContainer}>
                                <DialogTitle id="alert">Delete friend request</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete friend request?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button className={classes.modalButton} variant="contained" color="primary"
                                            onClick={handleModal}>
                                        Cancel
                                    </Button>
                                    <Button className={classes.modalButton} variant="contained" color="secondary"
                                            onClick={() => handleModalDeleteRequest(request.id)}>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </Grid>
            }
        </Fragment>
    )
}

FriendsListItem.propTypes = {
    friend: PropTypes.object,
    request: PropTypes.object,
    deleteFriend: PropTypes.func.isRequired,
    confirmRequest: PropTypes.func.isRequired,
    deleteRequest: PropTypes.func.isRequired,
    isOwnProfile: PropTypes.bool
}

export default connect(null, {deleteFriend, confirmRequest, deleteRequest})(FriendsListItem)
