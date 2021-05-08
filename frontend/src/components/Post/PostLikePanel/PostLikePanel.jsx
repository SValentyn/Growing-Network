import React, {Fragment, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {get, isEmpty} from 'lodash'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MessageIcon from '@material-ui/icons/Message'
import ShareIcon from '@material-ui/icons/Share'
import {Avatar, IconButton, Tooltip, Zoom} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import {updateLikes} from '../../../actions/post'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getAvatarColorHex, getFirstChars, getFullName} from '../../../utils/helpers/commonFormatter'

import classNames from 'classnames'
import useStyles from './postLikeStyles'

const PostLikePanel = ({postId, likes, comments, user, updateLikes, focusForCreatingComment}) => {
    const classes = useStyles()

    const [postIsLiked, setPostIsLiked] = useState(false)

    useEffect(
        () => setPostIsLiked(likes.some(like => like.username === user.username)),
        [likes, user.username]
    )

    const LikePanelTooltip = withStyles(theme => ({
        tooltip: {
            fontSize: theme.typography.pxToRem(13),
        }
    }))(Tooltip)

    const likedList = components => {
        if (isEmpty(components)) {
            return <p className={classes.text}>Post has no likes</p>
        }

        const listForRender = components.slice(0, 10)
        return listForRender.map(friend =>
            <div className={classes.container} key={get(friend, 'username')}>
                <Link to={`/profile/${get(friend, 'username')}`} className={classes.userLink}>
                    <Avatar src={getAvatarLink(friend)} className={classes.userPhoto} alt=""
                            style={{backgroundColor: getAvatarColorHex(friend)}}>
                        {getFirstChars(friend)}
                    </Avatar>
                </Link>
                <div className={classes.userContainer}>
                    <p className={classes.text}>{getFullName(friend)}</p>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div className={classes.panel}>
                <LikePanelTooltip title={likedList(likes)} placement="left"
                                  interactive TransitionComponent={Zoom}
                                  style={{marginLeft: -8}}>
                    <IconButton aria-label="like" className={classNames(classes.iconButton, classes.likeIconButton)}
                                onClick={() => updateLikes(postId)}>
                        {postIsLiked ? <FavoriteIcon color="secondary"/> : <FavoriteBorderIcon/>}
                    </IconButton>
                </LikePanelTooltip>
                {get(likes, 'length', '—')}

                <Tooltip title="Write a comment" placement="top"
                         interactive TransitionComponent={Zoom}
                         style={{marginLeft: 3}}>
                    <IconButton aria-label="comment" className={classes.iconButton}
                                onClick={focusForCreatingComment}>
                        <MessageIcon/>
                    </IconButton>
                </Tooltip>
                {get(comments, 'length', '—')}

                <Tooltip title="Share this post" placement="top"
                         interactive TransitionComponent={Zoom}
                         style={{marginLeft: 2}}>
                    <IconButton aria-label="share" className={classes.iconButton}
                                onClick={null}>
                        <ShareIcon/>
                    </IconButton>
                </Tooltip>
                {'0'}
            </div>
        </Fragment>
    )
}

PostLikePanel.propTypes = {
    postId: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    updateLikes: PropTypes.func.isRequired,
    focusForCreatingComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {updateLikes})(PostLikePanel)
