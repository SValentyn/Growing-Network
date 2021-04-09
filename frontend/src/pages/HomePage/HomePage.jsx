import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Container, Grid, Paper} from '@material-ui/core'

import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import ActiveFriends from '../../components/ActiveFriends/ActiveFriends'
import FriendSuggestions from '../../components/FriendSuggestions/FriendSuggestions'
import {getPostsForHomePage} from '../../actions/post'
import {getFriendSuggestions, getIncomingFriendRequests, loadActiveFriends} from '../../actions/friends'

import useStyles from './homePageStyles'

const POSTS_PAGE_SIZE = 10
const FIRST_PAGE = 0
const FRIEND_SUGGESTIONS_SIZE = 5
const ACTIVE_FRIENDS_PAGE_SIZE = 10

const HomePage = ({
    user,
    loadPostsHomePage,
    postsAreLoading,
    posts,
    friendSuggestions,
    friendSuggestionsAreLoading,
    getFriendSuggestions,
    activeFriends,
    activeFriendsAreLoading,
    loadActiveFriends,
    getIncomingFriendRequests
}) => {
    const classes = useStyles()

    useEffect(() => {
        loadPostsHomePage(FIRST_PAGE, POSTS_PAGE_SIZE, true)
        getFriendSuggestions(FRIEND_SUGGESTIONS_SIZE)
        loadActiveFriends(FIRST_PAGE, ACTIVE_FRIENDS_PAGE_SIZE, true)
        getIncomingFriendRequests()
    }, [loadPostsHomePage, getFriendSuggestions, loadActiveFriends, getIncomingFriendRequests])

    return (
        <InfiniteScroll
            contentArrLength={posts.length}
            loadContentHandler={loadPostsHomePage}
            contentIsLoading={postsAreLoading}
            size={POSTS_PAGE_SIZE}
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
            <Container className={classes.container} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <Paper className={classes.paper}>
                            <FriendSuggestions
                                suggestions={friendSuggestions}
                                suggestionsAreLoading={friendSuggestionsAreLoading}
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper className={classes.paper}>
                            <CreatePost profileOwner={user}/>
                        </Paper>
                        <PostFeed/>
                    </Grid>
                    <Grid item md={3}>
                        <Paper className={classes.paper}>
                            <ActiveFriends
                                activeFriends={activeFriends}
                                activeFriendsAreLoading={activeFriendsAreLoading}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </InfiniteScroll>
    )
}

HomePage.propTypes = {
    user: PropTypes.object.isRequired,
    postsAreLoading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    loadPostsHomePage: PropTypes.func.isRequired,
    getFriendSuggestions: PropTypes.func.isRequired,
    friendSuggestions: PropTypes.array.isRequired,
    friendSuggestionsAreLoading: PropTypes.bool.isRequired,
    activeFriends: PropTypes.array.isRequired,
    activeFriendsAreLoading: PropTypes.bool.isRequired,
    loadActiveFriends: PropTypes.func.isRequired,
    getIncomingFriendRequests: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    postsAreLoading: state.posts.loading,
    posts: state.posts.posts,
    friendSuggestions: state.friends.friendSuggestions,
    friendSuggestionsAreLoading: state.friends.friendSuggestionsAreLoading,
    activeFriends: state.friends.activeFriends,
    activeFriendsAreLoading: state.friends.loadingActiveFriends,
    getIncomingFriendRequests: PropTypes.func.isRequired
})

const mapDispatchToProps = dispatch => {
    return {
        loadPostsHomePage: (page, size, isInitial) => dispatch(getPostsForHomePage(page, size, isInitial)),
        getFriendSuggestions: page => dispatch(getFriendSuggestions(page)),
        loadActiveFriends: (page, size, isInitial) => dispatch(loadActiveFriends(page, size, isInitial)),
        getIncomingFriendRequests: () => dispatch(getIncomingFriendRequests())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
