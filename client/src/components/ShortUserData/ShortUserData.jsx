import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import {getDateWithoutTime} from '../../utils/date/getDate'

import useStyles from './shortUserDataStyles'

const ShortUserData = ({profileOwner}) => {
    const classes = useStyles()
    const {email, birthDate, gender} = profileOwner
    const formattedBirthDate = birthDate ? getDateWithoutTime(birthDate) : ''

    return (
        <div className={classes.container}>
            <Typography className={classes.header} variant="subtitle1" component="div">
                Short data
            </Typography>
            <div className={classes.textContainer}>
                <p><span className={classes.textSpan}>Gender:</span> {gender && gender.toLowerCase()}</p>
                <p><span className={classes.textSpan}>Email:</span> {email}</p>
                <p><span className={classes.textSpan}>Birthday:</span> {formattedBirthDate}</p>
            </div>
        </div>
    )
}

ShortUserData.propTypes = {
    profileOwner: PropTypes.object.isRequired
}

export default ShortUserData
