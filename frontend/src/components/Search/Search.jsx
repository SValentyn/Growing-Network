import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { Avatar, CircularProgress, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'

import { getAvatarLink } from '../../utils/helpers/imageHelper'
import { searchData } from '../../actions/search'
import { throttlingWrapper } from '../../utils/helpers/throttle'
import { getAvatarColorHex, getFirstChars } from '../../utils/helpers/commonFormatter'

import useStyles from './searchStyle'

const FIRST_PAGE = 0
const SEARCH_PAGE_SIZE = 10

const Search = ({ loading, searchData, searchResults }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (!isEmpty(searchResults) && !loading) {
            setOptions(searchResults)
        }
    }, [loading, searchResults])

    useEffect(() => {
        if (!open) {
            setOptions([])
        }
    }, [open])

    const searchDataWithThrottle = useRef(throttlingWrapper(searchData, 500)).current

    const handleInputChange = (evt, inputValue) => {
        if (inputValue.length >= 2) {
            searchDataWithThrottle(inputValue, FIRST_PAGE, SEARCH_PAGE_SIZE)
        } else {
            setOptions([])
        }
    }

    const renderOption = (option) => (
        <Link to={`/profile/${get(option, 'username')}`} className={classes.link}>
            <div className={classes.optionWrapper}>
                <Avatar src={getAvatarLink(option)} className={classes.userPhoto} alt=""
                        style={{ backgroundColor: getAvatarColorHex(option) }}>
                    {getFirstChars(option)}
                </Avatar>
                {`${get(option, 'firstName')} ${get(option, 'lastName')}`}
            </div>
        </Link>
    )

    return (
        <Autocomplete
            className={classes.searchInput}
            size="small"
            open={open}
            clearOnEscape
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={() => ''}
            renderOption={renderOption}
            options={options}
            loading={loading}
            onInputChange={handleInputChange}
            noOptionsText="No results found"
            renderInput={params => (
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <TextField
                        {...params}
                        placeholder="User Search"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            'aria-label': 'search',
                            endAdornment: (
                                <Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                </div>
            )}
        />
    )
}

Search.propTypes = {
    loading: PropTypes.bool.isRequired,
    searchData: PropTypes.func.isRequired,
    searchResults: PropTypes.array
}

const mapStateToProps = (state) => ({
    loading: state.search.searchResultLoading,
    searchResults: state.search.searchResults
})

export default connect(mapStateToProps, { searchData })(Search)
