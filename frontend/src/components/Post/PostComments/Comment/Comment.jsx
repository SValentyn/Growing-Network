import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {get} from 'lodash'
import DeleteIcon from '@material-ui/icons/Delete'
import {Avatar, Box, IconButton} from '@material-ui/core'

import {deleteComment} from '../../../../actions/post'
import {dateFormatter} from '../../../../utils/helpers/dateFormatter'
import {getFullName} from '../../../../utils/helpers/commonFormatter'
import {getAvatarLink} from '../../../../utils/helpers/imageHelper'

import useStyles from './commentStyles'

const Comment = ({postId, postOwner, comment, user, deleteComment}) => {
    const classes = useStyles()

    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const {id, author, message, date} = comment

    useEffect(
        () => setShowDeleteBtn(author.username === user.username || postOwner.username === user.username),
        [author.username, postOwner.username, user.username]
    )

    return (
        <div className={classes.panel}>
            <Box display="flex">
                <Link to={`/profile/${get(author, 'username')}`}>
                    <Avatar src={getAvatarLink(author)} alt="User"/>
                </Link>
                <div className={classes.comment}>
                    <p className={classes.commentText}>
                        <Link to={`/profile/${get(author, 'username')}`} className={classes.link}>
              <span className={classes.commentAuthor}>
                {getFullName(author)}
              </span>
                        </Link>
                        {message}
                    </p>
                    <p className={classes.commentDate}>{dateFormatter(date)}</p>
                </div>
            </Box>
            {showDeleteBtn &&
            <IconButton onClick={() => deleteComment(postId, id)} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>
            }
        </div>
    )
}

Comment.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    postOwner: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, {deleteComment})(Comment)
