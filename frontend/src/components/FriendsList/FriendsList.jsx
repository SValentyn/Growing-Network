import React, {Fragment} from 'react'
import {Grid, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {get, isEmpty} from 'lodash'

import FriendsListItem from './FriendsListItem/FriendsListItem'
import Preloader from '../Preloader/Preloader'

import useStyles from './friendsListStyles'

const FriendsList = ({friends, requests, friendsAreLoading, isOwnProfile}) => {
    const classes = useStyles()

    const fieldComponents = components => {
        if (friends) {
            if (isEmpty(friends)) {
                return <p className={classes.notification}>Not friends with anyone 🙄</p>
            } else {
                return components.map(friend => <FriendsListItem
                    friend={friend}
                    key={get(friend, 'username')}
                    isOwnProfile={isOwnProfile}/>)
            }
        } else {
            if (isEmpty(requests)) {
                return <p className={classes.notification}>Not friends with anyone 🙄</p>
            } else {
                return components.map(request => <FriendsListItem request={request}
                                                                  key={get(request.requester, 'username')}/>)
            }
        }
    }

    const content = (friends) ? fieldComponents(friends) : fieldComponents(requests)
    const loadedContent = friendsAreLoading ? <Preloader/> : content

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="subtitle1" component="div">
                {friends
                    ? <Fragment>Friends (<span
                        className={classes.count}>{get(friends, 'length', '—')}</span>)</Fragment>
                    : <Fragment>Friend Requests (<span
                        className={classes.count}>{get(requests, 'length', '—')}</span>)</Fragment>
                }
            </Typography>
            <Grid className={classes.gridContainer} container justify="flex-start" alignItems="flex-start">
                {loadedContent}
            </Grid>
        </div>
    )
}

FriendsList.propTypes = {
    friends: PropTypes.array,
    requests: PropTypes.array,
    friendsAreLoading: PropTypes.bool,
    isOwnProfile: PropTypes.bool
}

export default FriendsList
