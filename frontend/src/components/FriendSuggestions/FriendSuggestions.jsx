import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from '@material-ui/core'
import {isEmpty} from 'lodash'

import FriendSuggestionItem from './FriendSuggestionItem/FriendSuggestionItem'
import Preloader from '../Preloader/Preloader'

import useStyles from './friendSuggestionsStyles'

const FriendSuggestions = ({suggestions, suggestionsAreLoading}) => {
    const classes = useStyles()

    const suggestionsList = () => {
        if (isEmpty(suggestions)) {
            return <p className={classes.notification}>You have no friendship suggestions.<br/>Take the first step yourself! <span role="img" aria-label="emoji">😏</span></p>
        } else {
            return suggestions.map(s => <FriendSuggestionItem person={s.user}
                                                              commonFriends={s.commonFriends}
                                                              key={s.user.username}/>)
        }
    }

    const loadedContent = suggestionsAreLoading ? <Preloader/> : suggestionsList()

    return (
        <div className={classes.container}>
            <Typography variant="subtitle1" component="div" className={classes.header}>
                People you may know
            </Typography>
            {loadedContent}
        </div>
    )
}

FriendSuggestions.propTypes = {
    suggestions: PropTypes.array.isRequired,
    suggestionsAreLoading: PropTypes.bool.isRequired
}

export default FriendSuggestions
