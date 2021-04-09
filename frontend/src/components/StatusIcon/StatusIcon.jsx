import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import useStyles from './statusIconStyles'

const StatusIcon = ({className, color}) => {
    const classes = useStyles()

    const rootClassName = classnames(
        classes.root,
        {
            [classes[color]]: color
        },
        className
    )

    return (
        <span
            className={rootClassName}
        />
    )
}

StatusIcon.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['active', 'inActive'])
}

export default StatusIcon
