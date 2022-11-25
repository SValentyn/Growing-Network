import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Avatar, Container, Dialog, IconButton, Tab, Tabs, Tooltip, Zoom } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ManageFriendshipButton from '../../ManageFriendshipButton/ManageFriendshipButton'
import UpdateProfile from '../UpdateProfile/UpdateProfile'
import StyledBadge from './StyledBadge'
import { changeTab } from '../../../actions/profileTab'
import { getAvatarLink, getProfileCoverLink } from '../../../utils/helpers/imageHelper'
import { getAvatarColorHex, getFirstChars, getFullName } from '../../../utils/helpers/commonFormatter'
import { getLastActiveTime } from '../../../utils/helpers/dateFormatter'

import styleConstants from '../../../utils/constants/styleConstants'
import useStyles from './profileCoverStyles'

const ProfileCover = ({ profileOwner, isOwnProfile, selectedTab, changeTab }) => {
    const classes = useStyles({ profileCover: getProfileCoverLink(profileOwner) })

    const [modalOpen, setModalOpen] = useState(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }

    const handleChangeTab = (event, value) => {
        changeTab(value)
    }

    const getStyle = (isActive) => {
        if (isActive) return { color: styleConstants.CONTAINER_TEXT_COLOR }
    }

    return (
        <div className={classes.container}>
            <div className={classes.avatarBg}>
                <Avatar src={getAvatarLink(profileOwner)} className={classes.avatarImg} alt=""
                        style={{backgroundColor: getAvatarColorHex(profileOwner)}}>
                    {getFirstChars(profileOwner)}
                </Avatar>
                <p className={classes.avatarName}>{getFullName(profileOwner)}</p>
                {isOwnProfile && (
                    <Tooltip title="Edit profile" placement="right" TransitionComponent={Zoom}>
                        <IconButton className={classes.editProfileIcon} onClick={handleModal} aria-label="Edit profile">
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Tooltip>)
                }
                {!isOwnProfile && <ManageFriendshipButton profileOwner={profileOwner}/>}
                <Dialog disableAutoFocus
                        scroll={'body'}
                        fullWidth={true}
                        maxWidth={'md'}
                        open={modalOpen}
                        onClose={handleModal}>
                    <Container className={classes.modalContainer}>
                        <UpdateProfile handleClose={handleModal}/>
                    </Container>
                </Dialog>
            </div>
            <div className={classes.tabContainer}>
                <Tabs
                    value={selectedTab}
                    TabIndicatorProps={{ style: { background: styleConstants.CONTAINER_TEXT_COLOR } }}
                    onChange={handleChangeTab}
                    aria-label="icon label tabs"
                    className={classes.submenu}>
                    <Tab
                        style={getStyle(selectedTab === 'timeline')}
                        className={classes.submenuItem}
                        label="Timeline"
                        value="timeline"/>
                    <Tab
                        style={getStyle(selectedTab === 'friends')}
                        className={classes.submenuItem}
                        label={'Friends'}
                        value="friends"/>
                    {isOwnProfile && <Tab
                        style={getStyle(selectedTab === 'friend requests')}
                        className={classes.submenuItem}
                        label={'Friend requests'}
                        value="friend requests"/>}
                    <Tab
                        style={getStyle(selectedTab === 'photos')}
                        className={classes.submenuItem}
                        label="Photos"
                        value="photos"/>
                    <Tab
                        style={getStyle(selectedTab === 'messages')}
                        className={classes.submenuItem}
                        label="Messages"
                        value="messages"/>
                </Tabs>
            </div>
        </div>
    )
}

ProfileCover.propTypes = {
    profileOwner: PropTypes.object.isRequired,
    selectedTab: PropTypes.string.isRequired,
    isOwnProfile: PropTypes.bool.isRequired,
    changeTab: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    changeTab: (value) => dispatch(changeTab(value))
})

export default connect(null, mapDispatchToProps)(ProfileCover)
