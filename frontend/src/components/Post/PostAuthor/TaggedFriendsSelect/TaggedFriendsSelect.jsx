import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from '@material-ui/core'

import {getAvatarLink} from '../../../../utils/helpers/imageHelper'
import {getFullName} from '../../../../utils/helpers/commonFormatter'

import useStyles from './taggedFriendsSelectStyles'

const TaggedFriendsSelect = ({taggedFriends}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
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

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    const links = taggedFriends.map(friend =>
        <Link to={'/profile/' + friend.username}
              className={classes.menuLink}
              key={friend.username}>
            <MenuItem>
                <img src={getAvatarLink(friend)}
                     alt={friend.username}
                     className={classes.userPic}/>
                <p className={classes.selectFullName}>
                    {getFullName(friend)}
                </p>
            </MenuItem>
        </Link>)

    return (
        <Fragment>
            <a
                className={classes.tagLink}
                href={'/'}
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
            >
                {taggedFriends.length + ' other'}
            </a>
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

TaggedFriendsSelect.propTypes = {
    taggedFriends: PropTypes.array.isRequired
}

export default TaggedFriendsSelect
