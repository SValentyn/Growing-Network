import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Grid, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {get, isEmpty} from 'lodash'

import Preloader from '../../Preloader/Preloader'
import Tile from '../../Tile/Tile'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getFullName} from '../../../utils/helpers/commonFormatter'

import useStyles from './profileFieldStyles'
import {selectFriendsTab, selectPhotosTab} from '../../../actions/profileTab'
import {Link} from 'react-router-dom'

const ProfileField = ({friends, userPhotos, loadingPhotos, friendsAreLoading, selectFriendsTab, selectPhotosTab}) => {
    const classes = useStyles()

    const gotoFriendsTab = () => {
        selectFriendsTab()
    }

    const gotoPhotosTab = () => {
        selectPhotosTab()
    }

    const fieldComponents = components => {
        const listForRender = components.slice(0, 8)

        if (friends) {
            if (isEmpty(friends)) {
                return <p className={classes.notification}>Not friends with anyone <span role="img" aria-label="emoji">🙄</span></p>
            } else {
                return listForRender.map(friend =>
                    <Tile
                        imageSrc={getAvatarLink(friend)}
                        title={getFullName(friend)}
                        username={get(friend, 'username')}
                        key={get(friend, 'username')}/>)
            }
        } else {
            if (isEmpty(userPhotos)) {
                return (
                    <p className={classes.notification}>There are no pictures <span role="img"
                                                                                    aria-label="emoji">😞</span></p>
                )
            } else {
                return listForRender.map(photo =>
                    <Tile imageSrc={get(photo, 'src')} key={get(photo, 'id', '')}/>
                )
            }
        }
    }

    const content = (friends)
        ? (friendsAreLoading ? <Preloader/> : fieldComponents(friends))
        : (loadingPhotos ? <Preloader/> : fieldComponents(userPhotos))

    return (!friends && !userPhotos)
        ? (<Fragment>No content</Fragment>)
        : (
            <div className={classes.container}>
                <Typography className={classes.header} variant="subtitle1" component="div">
                    {friends
                        ? (
                            <Fragment>
                                <Link to={`#`} onClick={gotoFriendsTab} className={classes.headerTitle}>
                                    Friends ({get(friends, 'length', '0')})
                                </Link>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Link to={`#`} onClick={gotoPhotosTab} className={classes.headerTitle}>
                                    Photos ({get(userPhotos, 'length', '—')})
                                </Link>
                            </Fragment>
                        )
                    }
                </Typography>
                <Grid className={classes.gridContainer} container spacing={1}>
                    {content}
                </Grid>
            </div>
        )
}

ProfileField.propTypes = {
    friends: PropTypes.array,
    userPhotos: PropTypes.array,
    loadingPhotos: PropTypes.bool,
    friendsAreLoading: PropTypes.bool,
    selectFriendsTab: PropTypes.func.isRequired,
    selectPhotosTab: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    selectFriendsTab: () => dispatch(selectFriendsTab()),
    selectPhotosTab: () => dispatch(selectPhotosTab())
})

export default connect(null, mapDispatchToProps)(ProfileField)
