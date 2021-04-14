import React, {Fragment, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {get} from 'lodash'
import {AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import MoreIcon from '@material-ui/icons/MoreVert'

import Search from '../Search/Search'
import ChatUpdateCenter from './ChatUpdateCenter/ChatUpdateCenter'
import {logout} from '../../actions/auth'
import {resetTab, selectFriendRequestTab} from '../../actions/profileTab'

import useStyles from './navbarStyles'

const Navbar = ({
    auth: {isAuthenticated, user},
    incomingFriendRequests,
    selectFriendRequestTab,
    logout,
    unreadChats,
    resetTab
}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    let history = useHistory()

    const handleChange = () => {
        if (!isAuthenticated) {
            history.push('/login')
        } else {
            logout()
            history.push('/')
        }
    }

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const openProfile = () => {
        handleMenuClose()
        resetTab()
        history.push('/me')
    }

    const openFriendRequestInProfile = () => {
        handleMenuClose()
        selectFriendRequestTab()
        history.push('/me')
    }

    const openChat = () => {
        handleMenuClose()
        history.push('/chat')
    }

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={openProfile}>Profile</MenuItem>
            <MenuItem onClick={openChat}>Messenger</MenuItem>
            <MenuItem onClick={handleChange}>Logout</MenuItem>
        </Menu>
    )

    const unreadMessagesCount = unreadChats.reduce((sum, chat) => sum + chat.unreadMessages.length, 0)

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="Show a new messages" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="Show a new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="Account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Menu</p>
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.container}>
                <Toolbar className={classes.toolbar}>
                    <Link to="/" className={classes.link}>
                        <img src={'/static/images/logo64.png'} alt={'Home'} className={classes.logoImage}/>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>
                            Growing Network
                        </Link>
                    </Typography>
                    <div className={classes.searchContainer}>
                        <Search/>
                    </div>

                    {isAuthenticated && user && (
                        <Fragment>
                            <div className={classes.root}/>
                            <div className={classes.sectionDesktop}>
                                <ChatUpdateCenter/>
                                <Tooltip title="Messages">
                                    <IconButton
                                        className={classes.navbarButton}
                                        onClick={openChat}
                                        color="inherit">
                                        <Badge badgeContent={unreadMessagesCount} color="secondary">
                                            <MailIcon/>
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Friend requests">
                                    <IconButton
                                        className={classes.navbarButton}
                                        onClick={openFriendRequestInProfile}
                                        color="inherit">
                                        <Badge badgeContent={get(incomingFriendRequests, 'length', '0')}
                                               color="secondary">
                                            <SupervisedUserCircleIcon/>
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <IconButton
                                    className={classes.navbarButton}
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon/>
                                </IconButton>
                            </div>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    selectFriendRequestTab: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    incomingFriendRequests: PropTypes.array.isRequired,
    unreadChats: PropTypes.array.isRequired,
    resetTab: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    incomingFriendRequests: state.friends.incomingFriendRequests,
    unreadChats: state.chat.unreadChats
})

const mapDispatchToProps = dispatch => ({
    selectFriendRequestTab: () => dispatch(selectFriendRequestTab()),
    logout: () => dispatch(logout()),
    resetTab: () => dispatch(resetTab())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
