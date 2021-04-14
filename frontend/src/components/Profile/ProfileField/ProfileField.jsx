import React, {Fragment} from 'react'
import {Grid, Typography} from '@material-ui/core'
import PropTypes from 'prop-types'
import {get, isEmpty} from 'lodash'

import Preloader from '../../Preloader/Preloader'
import Tile from '../../Tile/Tile'
import {getAvatarLink} from '../../../utils/helpers/imageHelper'
import {getFullName} from '../../../utils/helpers/commonFormatter'

import useStyles from './profileFieldStyles'

const ProfileField = ({friends, userPhotos, loadingPhotos, friendsAreLoading}) => {
    const classes = useStyles()

    const fieldComponents = components => {
        const listForRender = components.slice(0, 9)

        if (friends) {
            if (isEmpty(friends)) {
                return <p className={classes.notification}>Not friends with anyone 🙄</p>
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
                return <p className={classes.notification}>There are no pictures 😞</p>
            } else {
                return listForRender.map(photo => <Tile imageSrc={get(photo, 'src')}
                                                        key={get(photo, 'id', '')}/>)
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
                        ? <Fragment>Friends (<span
                            className={classes.count}>{get(friends, 'length', '—')}</span>)</Fragment>
                        : <Fragment>Photos (<span
                            className={classes.count}>{get(userPhotos, 'length', '—')}</span>)</Fragment>
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
    friendsAreLoading: PropTypes.bool
}

export default ProfileField
