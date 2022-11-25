import React from 'react'
import PropTypes from 'prop-types'
import styleConstants from '../../utils/constants/styleConstants'

const Background = ({ children }) => {
    return (
        <div style={{
            backgroundColor: styleConstants.BACKGROUND_COLOR,
            minHeight: 'calc(100vh - 63px)',
            position: 'relative'
        }}>
            {children}
        </div>
    )
}

Background.propTypes = {
    children: PropTypes.object
}

export default Background
