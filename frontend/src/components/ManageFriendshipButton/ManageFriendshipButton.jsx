import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'

import useStyles from './manageFriendshipButtonStyles'

import {get} from 'lodash'
import {checkFriendshipStatus, confirmRequest, sendFriendRequest} from '../../actions/friends'

const ENUM_FRIENDS = 'FRIENDS'
const ENUM_NOT_FRIENDS = 'NOT_FRIENDS'
const ENUM_WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL'
const ENUM_NEEDS_APPROVAL = 'NEEDS_APPROVAL'

const ManageFriendshipButton = ({profileOwner, confirmRequest, incomingFriendRequests}) => {
    const classes = useStyles()
    const {username} = profileOwner
    const [friendshipStatus, setFriendshipStatus] = useState(null)

    useEffect(() => {
        if (username) {
            checkFriendshipStatus(username)
                .then(result => setFriendshipStatus(result))
                .catch(() => {})
        }
    }, [username])

    const getFriendRequestId = requesterUsername => {
        const request = incomingFriendRequests.find(req => req.requester.username === requesterUsername)
        return get(request, 'id')
    }
    let content
    let handlerFunction

    switch (friendshipStatus) {
        case ENUM_FRIENDS:
            content = 'Your friend!'
            handlerFunction = () => {} // may be used for new functionality
            break
        case ENUM_NOT_FRIENDS:
            content = 'Send friend request'
            handlerFunction = () => sendFriendRequest(username)
                .then(() => setFriendshipStatus(ENUM_WAITING_FOR_APPROVAL), () => {})
            break
        case ENUM_NEEDS_APPROVAL:
            content = 'Approve request'
            handlerFunction = () => confirmRequest(getFriendRequestId(username))
                .then(() => setFriendshipStatus(ENUM_FRIENDS), () => {})
            break
        case ENUM_WAITING_FOR_APPROVAL:
            content = 'Request was sent'
            handlerFunction = () => {} // may be used for new functionality
            break
        default:
            return null
    }

    return (
        <Button className={classes.button} variant="outlined"
                onClick={handlerFunction}>
            {content}
        </Button>
    )
}

ManageFriendshipButton.propTypes = {
    profileOwner: PropTypes.object.isRequired,
    confirmRequest: PropTypes.func.isRequired,
    incomingFriendRequests: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    incomingFriendRequests: state.friends.incomingFriendRequests
})

const mapDispatchToProps = dispatch => ({
    confirmRequest: (requestId) => dispatch(confirmRequest(requestId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageFriendshipButton)
