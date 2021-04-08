import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress'
import styleConstants from '../../utils/constants/styleConstants'

import useStyles from './preloaderStyles'

export default function Preloader({color = styleConstants.PRIMARY_COLOR, fullScreen = false, size = 40}) {
    const classes = useStyles({fullScreen})

    return (
        <div className={classNames(classes.root, {fullScreen})}>
            <CircularProgress style={{color}} size={size}/>
        </div>
    )
}

Preloader.propTypes = {
    color: PropTypes.string,
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
