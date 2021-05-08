import React, {Fragment, useEffect} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Grid, Paper} from '@material-ui/core'

import Chat from '../../components/Chat/Chat'
import ProfileCover from '../../components/Profile/ProfileCover/ProfileCover'
import ShortUserData from '../../components/ShortUserData/ShortUserData'
import ProfileField from '../../components/Profile/ProfileField/ProfileField'
import FriendsList from '../../components/FriendsList/FriendsList'
import PhotoList from '../../components/PhotoList/PhotoList'
import CreatePost from '../../components/Post/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import Preloader from '../../components/Preloader/Preloader'
import {getUserPhotosFromPosts} from '../../actions/image'
import {getPostsForProfile} from '../../actions/post'
import {getUserProfile} from '../../actions/search'
import {getIncomingFriendRequests, loadUserFriends} from '../../actions/friends'
import {clearCurrentChatMessages} from '../../actions/chat'
import {resetTab} from '../../actions/profileTab'

import useStyles from './profilePageStyles'

const FRIENDS_PAGE_SIZE = 20
const POSTS_PAGE_SIZE = 10
const FIRST_PAGE = 0

const ProfilePage = ({
    loadUserProfile,
    posts,
    postsAreLoading,
    user,
    loadUserPhotos,
    userPhotos,
    loadingPhotos,
    profileOwner,
    profileLoading,
    getPostsForProfile,
    friends,
    friendsAreLoading,
    loadUserFriends,
    incomingFriendRequests,
    getIncomingFriendRequests,
    resetTab,
    selectedTab,
    clearCurrentChatMessages
}) => {
    const classes = useStyles()
    const userId = useParams().userId || user.username
    const isOwnProfile = userId === user.username
    const currentUser = user.username
    const loadUserPosts = getPostsForProfile.bind(null, userId)

    useEffect(() => {
        loadUserProfile(userId)
        loadUserPhotos(userId)
        getPostsForProfile(userId, FIRST_PAGE, POSTS_PAGE_SIZE, true)
        loadUserFriends(userId, FIRST_PAGE, FRIENDS_PAGE_SIZE, true)

        // Reset Tab on Component unmount
        return () => resetTab()
    }, [loadUserPhotos, loadUserProfile, loadUserFriends, getPostsForProfile, userId, resetTab, currentUser])

    useEffect(() => { // separate useEffect cause this request doesn't depend on profile change, it's for user
        getIncomingFriendRequests()
    }, [getIncomingFriendRequests, isOwnProfile])

    useEffect(() => {
        if (selectedTab !== 'messages') {
            clearCurrentChatMessages()
        }
    }, [selectedTab, clearCurrentChatMessages])

    return profileLoading ? <Preloader fullScreen/> : (
        <InfiniteScroll
            isDisable={selectedTab === 'messages'}
            contentArrLength={posts.length}
            loadContentHandler={loadUserPosts}
            contentIsLoading={postsAreLoading}
            scrollContainerStyles={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflowX: 'hidden',
                overflowY: 'scroll'
            }}
        >
            <Grid container className={classes.gridContainer} spacing={3}>
                <Grid item xs={9}>
                    <Paper className={classes.paper} elevation={1}>
                        <ProfileCover
                            profileOwner={profileOwner}
                            isOwnProfile={isOwnProfile}
                            selectedTab={selectedTab}/>
                    </Paper>
                </Grid>
                {selectedTab === 'timeline' &&
                <Fragment>
                    <Grid item xs={9} sm={4}>
                        <Paper className={classes.paper} elevation={1}>
                            <ShortUserData profileOwner={profileOwner}/>
                        </Paper>
                        <Paper className={classes.paper} elevation={1}>
                            <ProfileField userPhotos={userPhotos} loadingPhotos={loadingPhotos}/>
                        </Paper>
                        <Paper className={classes.paper} elevation={1}>
                            <ProfileField friends={friends} friendsAreLoading={friendsAreLoading}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} sm={5} className={classes.feedColumn}>
                        <Paper className={classes.paper} elevation={1}>
                            <CreatePost profileOwner={profileOwner}/>
                        </Paper>
                        <PostFeed/>
                    </Grid>
                </Fragment>
                }
                {selectedTab === 'friend requests' &&
                <Grid item sm={9}>
                    <Paper className={classes.paper} elevation={1}>
                        <FriendsList requests={incomingFriendRequests}/>
                    </Paper>
                </Grid>
                }
                {selectedTab === 'friends' &&
                <Grid item sm={9}>
                    <Paper className={classes.paper} elevation={1}>
                        <FriendsList friends={friends} isOwnProfile={isOwnProfile}/>
                    </Paper>
                </Grid>
                }
                {selectedTab === 'photos' &&
                <Grid item sm={9}>
                    <Paper className={classes.paper} elevation={1}>
                        <PhotoList userPhotos={userPhotos}/>
                    </Paper>
                </Grid>
                }
                {selectedTab === 'messages' && !isOwnProfile && <Grid item sm={9}>
                    <Paper className={classes.paper} elevation={1}>
                        <Chat userId={userId} isSingleChat containerHeight="HALF"/>
                    </Paper>
                </Grid>}
                {selectedTab === 'messages' && isOwnProfile && <Redirect to="/chat"/>}
            </Grid>
        </InfiniteScroll>
    )
}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
    loadUserPhotos: PropTypes.func.isRequired,
    userPhotos: PropTypes.array.isRequired,
    loadingPhotos: PropTypes.bool.isRequired,
    postsAreLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    getPostsForProfile: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    profileOwner: PropTypes.object.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    friends: PropTypes.array.isRequired,
    loadUserFriends: PropTypes.func.isRequired,
    incomingFriendRequests: PropTypes.array.isRequired,
    getIncomingFriendRequests: PropTypes.func.isRequired,
    resetTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
    clearCurrentChatMessages: PropTypes.func.isRequired,
    friendsAreLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    selectedTab: state.profileTab.selectedTab,
    userPhotos: state.images.userPhotos,
    loadingPhotos: state.images.loading,
    postsAreLoading: state.posts.loading,
    posts: state.posts.posts,
    profileOwner: state.search.userProfile,
    profileLoading: state.search.profileLoading,
    friends: state.friends.userFriends,
    friendsAreLoading: state.friends.loading,
    incomingFriendRequests: state.friends.incomingFriendRequests
})

const mapDispatchToProps = (dispatch) => ({
    loadUserPhotos: (userId) => dispatch(getUserPhotosFromPosts(userId)),
    getPostsForProfile: (userId, page, size, isInitial) => dispatch(getPostsForProfile(userId, page, size, isInitial)),
    loadUserProfile: (userId) => dispatch(getUserProfile(userId)),
    loadUserFriends: (username, page, size, isInitial) => dispatch(loadUserFriends(username, page, size, isInitial)),
    getIncomingFriendRequests: () => dispatch(getIncomingFriendRequests()),
    clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
    resetTab: () => dispatch(resetTab())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
