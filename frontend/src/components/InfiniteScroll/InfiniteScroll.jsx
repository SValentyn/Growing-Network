import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'

const InfiniteScroll = ({
    isDisable,
    contentArrLength,
    loadContentHandler,
    contentIsLoading,
    pageSize = 10,
    children,
    isReverseDirection = false,
    isContentUpdated,
    throttleDelay = 3000,
    scrollContainerStyles,
    isLastPage = false
}) => {
    const [furtherDownloadIsBlocked, setFurtherDownloadBlocked] = useState(false)
    const page = Math.floor(contentArrLength / pageSize)
    let scrolledFromBottom = useRef(0)

    useEffect(() => {
        if (isReverseDirection) {
            const element = InfiniteScroll.scrollDiv
            element.scrollTop = element.scrollHeight - scrolledFromBottom.current
        }
    })

    useEffect(() => {
        if (isContentUpdated) {
            scrolledFromBottom.current = 0
        }
    }, [isContentUpdated])

    const handleInfiniteScroll = () => {
        const element = InfiniteScroll.scrollDiv

        const scrolled = isReverseDirection
            ? element.scrollTop === 0
            : element.scrollHeight - element.offsetHeight - element.scrollTop < 100

        if (scrolled &&
            !furtherDownloadIsBlocked &&
            !contentIsLoading &&
            !isLastPage) {
            setFurtherDownloadBlocked(true)
            scrolledFromBottom.current = element.scrollHeight
            loadContentHandler(page, pageSize, false)

            setTimeout(() => {
                setFurtherDownloadBlocked(false)
            }, throttleDelay)
        }
    }

    return (
        <div
            ref={input => {
                InfiniteScroll.scrollDiv = input
            }}
            onScroll={isDisable ? null : handleInfiniteScroll}
            style={scrollContainerStyles}
        >
            {children}
        </div>
    )
}

InfiniteScroll.propTypes = {
    contentArrLength: PropTypes.number.isRequired,
    loadContentHandler: PropTypes.func.isRequired,
    contentIsLoading: PropTypes.bool.isRequired,
    children: PropTypes.object,
    isOwnProfileViewMode: PropTypes.bool,
    userId: PropTypes.string,
    pageSize: PropTypes.number,
    isReverseDirection: PropTypes.bool,
    throttleDelay: PropTypes.number,
    scrollContainerStyles: PropTypes.object.isRequired,
    isLastPage: PropTypes.bool,
    isDisable: PropTypes.bool,
    isContentUpdated: PropTypes.bool
}

export default InfiniteScroll
