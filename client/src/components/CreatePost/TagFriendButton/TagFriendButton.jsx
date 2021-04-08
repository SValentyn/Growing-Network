import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from '@material-ui/core'
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined'
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined'

import {getAvatarLink} from '../../../utils/helpers/imageLinkHelpers'

import useStyles from './tagFriendButtonStyles'

const sortSelectedFirst = (a, b) => {
    if (a.isSelected === true && b.isSelected === false) {
        return -1
    }
    if (a.isSelected === false && b.isSelected === true) {
        return 1
    }
    return 0
}

const TagFriendButton = ({friends, selected, handleFriendTag, getFriendsToTag}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = (e) => {
        e.preventDefault()
        getFriendsToTag()
        setOpen(prevOpen => !prevOpen)
    }

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    const links = friends
        .map(friend => ({
            userLabel: {...friend},
            isSelected: selected.some(userLabel => userLabel.username === friend.username)
        }))
        .sort(sortSelectedFirst)
        .map(friend => (<MenuItem
            onClick={() => handleFriendTag(friend.userLabel)}
            key={friend.userLabel.username}
        >
      <span>
        {friend.isSelected && <BeenhereOutlinedIcon className={classes.checkedIcon}/>}
      </span>&nbsp;
            <img src={getAvatarLink(friend.userLabel)} alt={friend.userLabel.username} className={classes.userPic}/>
            <span>{friend.userLabel.firstName} {friend.userLabel.lastName}</span>
        </MenuItem>))

    return (
        <Fragment>
            <Button
                color="primary"
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <div className={classes.label}>
                    <AssignmentIndOutlinedIcon className={classes.icon}/>
                    <div className={classes.labelText}> Tag a friend</div>
                </div>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {links}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    )
}

TagFriendButton.propTypes = {
    friends: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleFriendTag: PropTypes.func.isRequired,
    getFriendsToTag: PropTypes.func.isRequired
}

export default TagFriendButton
