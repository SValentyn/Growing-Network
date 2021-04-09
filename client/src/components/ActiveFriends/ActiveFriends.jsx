import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {get, isEmpty} from 'lodash'
import {Avatar, IconButton, Tooltip, Typography} from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import Preloader from '../Preloader/Preloader'
import {getAvatarLink} from '../../utils/helpers/imageHelper'
import {getActiveTime} from '../../utils/helpers/dateFormatter'
import {getFullName} from '../../utils/helpers/commonFormatter'
import {changeTab} from '../../actions/profileTab'

import useStyles from './activeFriendsStyles'

const ActiveFriends = ({activeFriends, activeFriendsAreLoading, changeTab}) => {
    const classes = useStyles()

    const friendsList = () => {
        if (isEmpty(activeFriends)) {
            return <p className={classes.notification}>You have no active friends</p>
        } else {
            return activeFriends.map(friend => (
                    <div className={classes.container} key={get(friend, 'username')}>
                        <div className={classes.user}>
                            <Link to={`/profile/${get(friend, 'username')}`}>
                                <Avatar className={classes.userPhoto} src={getAvatarLink(friend)} alt="User"/>
                            </Link>
                            <div className={classes.userName}>
                                <Link to={`/profile/${get(friend, 'username')}`} className={classes.userLink}>
                                    <p className={classes.userFullName}>{getFullName(friend)}</p>
                                </Link>
                                <p className={classes.activeTime}>{getActiveTime(friend.lastActivityTime)}</p>
                            </div>
                        </div>
                        <Tooltip title="Send message">
                            <Link to={`/profile/${get(friend, 'username')}`} onClick={() => changeTab('messages')}>
                                <IconButton className={classes.sendMessage} aria-label="Send message">
                                    <MailOutlineIcon/>
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                )
            )
        }
    }

    const loadedContent = activeFriendsAreLoading ? <Preloader/> : friendsList()

    return (
        <Fragment>
            <Typography className={classes.header} variant="subtitle1" component="div">
                Active Friends – <span className={classes.count}>{get(activeFriends, 'length', '—')}</span>
            </Typography>
            {loadedContent}
        </Fragment>
    )
}

ActiveFriends.propTypes = {
    activeFriends: PropTypes.array.isRequired,
    activeFriendsAreLoading: PropTypes.bool.isRequired,
    changeTab: PropTypes.func.isRequired
}

export default connect(null, {changeTab})(ActiveFriends)
