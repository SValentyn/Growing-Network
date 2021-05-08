import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {get} from 'lodash'
import Box from '@material-ui/core/Box'
import {Avatar, Grid, IconButton, Tooltip, Typography, Zoom} from '@material-ui/core'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'

import {sendFriendRequest} from '../../../actions/friends'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getAvatarColorHex, getFirstChars, getFullName} from '../../../utils/helpers/commonFormatter'

import useStyles from './friendSuggestionItemStyles'

const COMMON_F_AVATARS_TO_SHOW = 4

const FriendSuggestions = ({person, commonFriends}) => {
    const classes = useStyles()
    const {username} = person
    const [requestSent, setRequestSent] = useState(false)

    const createFriendRequest = responderId => {
        sendFriendRequest(responderId)
            .then(() => setRequestSent(true))
    }

    const commonFriendAvatars = commonFriends
        .map(commonFriend =>
            (<Link to={'profile/' + commonFriend.username} key={commonFriend.username} className={classes.userLink}>
                <Tooltip title={getFullName(commonFriend)} TransitionComponent={Zoom}>
                    <Avatar className={classes.commonFriendAvatar} src={getAvatarLink(commonFriend)} alt=""
                            style={{backgroundColor: getAvatarColorHex(commonFriend)}}>
                        {getFirstChars(commonFriend)}
                    </Avatar>
                </Tooltip>
            </Link>)
        )
    commonFriendAvatars.length = COMMON_F_AVATARS_TO_SHOW

    return (
        <div elevation={0} className={classes.container}>
            <Grid container justify="space-between" alignContent="center">

                <Grid item container xs={10}>
                    <Grid item>
                        <Link to={`/profile/${get(person, 'username')}`} className={classes.userLink}>
                            <Avatar className={classes.image} src={getAvatarLink(person)} alt=""
                                    style={{backgroundColor: getAvatarColorHex(person)}}>
                                {getFirstChars(person)}
                            </Avatar>
                        </Link>
                    </Grid>

                    <Grid item style={{alignSelf: 'center'}}>
                        <Typography variant="subtitle1" component="div" className={classes.name}>
                            <Link to={`/profile/${get(person, 'username')}`} className={classes.userLink}>
                                {getFullName(person)}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={2}>
                    {!requestSent
                        ? (<IconButton className={classes.sendIcon} onClick={() => createFriendRequest(username)}
                                       aria-label="">
                                <PersonAddOutlinedIcon/>
                            </IconButton>
                        ) : (<DoneOutlineIcon className={classes.requestSentIcon}/>)
                    }
                </Grid>

                <Grid item xs={12} className={classes.commonFriendsWrapper}>
                    <Box display="flex">
                        <span>{commonFriends.length > 0 ? commonFriends.length + ' mutual friends: ' : 'No mutual friends'}  </span>
                        {commonFriendAvatars} {commonFriendAvatars.length < commonFriends.length && '...'}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

FriendSuggestions.propTypes = {
    person: PropTypes.shape({
        avatar: PropTypes.object,
        username: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired,
    commonFriends: PropTypes.array.isRequired
}

export default FriendSuggestions
