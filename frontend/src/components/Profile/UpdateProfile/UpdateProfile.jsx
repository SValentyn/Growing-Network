/* global URL */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core'
import classNames from 'classnames'

import {PhotoCamera} from '@material-ui/icons'
import {areNoErrors, validateEmail} from '../../../utils/helpers/inputValidator'
import {uploadSingleImage} from '../../../actions/post'
import {updateProfile} from '../../../actions/auth'
import {getAvatarLink, getProfileCoverLink} from '../../../utils/helpers/imageHelper'

import useStyles from './updateProfileStyles'
import throttle from 'lodash/throttle'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import parse from 'autosuggest-highlight/parse'

function loadScript(src, position, id) {
    if (!position) {
        return
    }
    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('id', id)
    script.src = src
    position.appendChild(script)
}

const autocompleteService = {current: null}

const UpdateProfile = ({user, handleClose, updateProfile}) => {
    const {avatar, profileCover, firstName, lastName, email, birthDate, gender, location} = user

    const [formData, setFormData] = React.useState({
        avatar: {
            file: null,
            url: getAvatarLink(user)
        },
        profileCover: {
            file: null,
            url: getProfileCoverLink(user)
        },
        firstName,
        lastName,
        email,
        birthDate: birthDate,
        gender: gender,
        location : '',
        emailError: ''
    })

    const classes = useStyles({profileCover: formData.profileCover.url})

    const [value, setValue] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    const [options, setOptions] = React.useState([])
    const loaded = React.useRef(false)

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            // Replace with your key to get data
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyD7CmYGfPF74UMw-77kjl8o4webIPmQKx4&libraries=places',
                document.querySelector('head'),
                'google-maps',
            )
        }
        loaded.current = true
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback)
            }, 200),
        [],
    )

    React.useEffect(() => {
        let active = true

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService()
        }
        if (!autocompleteService.current) {
            return undefined
        }
        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetch({input: inputValue}, (results) => {
            if (active) {
                let newOptions = []

                if (value) {
                    newOptions = [value]
                }

                if (results) {
                    newOptions = [...newOptions, ...results]
                }

                setOptions(newOptions)
            }
        })

        return () => {
            active = false
        }
    }, [value, inputValue, fetch])

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onBirthDateChange = (e) => {
        setFormData({...formData, birthDate: new Date(e.target.value).getTime()})
    }

    const parseMillisToStringDate = (dateMillis) => {
        if (dateMillis === null) {
            return 'dd.mm.yyyy'
        }
        const date = new Date(dateMillis)
        const year = date.getFullYear()
        let month = '' + (date.getMonth() + 1)
        let day = '' + date.getDate()

        if (month.length < 2) { month = '0' + month }
        if (day.length < 2) { day = '0' + day }

        return [year, month, day].join('-')
    }

    const getFileObject = (e) => {
        const file = e.target.files[0]
        return {
            file,
            url: URL.createObjectURL(file),
            uploadError: false
        }
    }

    const handleBackgroundChange = (e) => {
        const newBackground = getFileObject(e)
        setFormData({...formData, profileCover: newBackground})
    }

    const handleAvatarChange = (e) => {
        const newAvatar = getFileObject(e)
        setFormData({...formData, avatar: newAvatar})
    }

    const validateInput = () => {
        const errors = {}
        errors.emailError = validateEmail(formData.email)
        setFormData({...formData, ...errors})

        return areNoErrors(errors)
    }

    const sendImage = (newImg, currentImg) => {
        if (newImg.file) {
            return uploadSingleImage(newImg)
        }
        return Promise.resolve(currentImg)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const images = {}
        const inputIsValid = validateInput()

        if (inputIsValid) {
            const imgUploads = []
            imgUploads
                .push(sendImage(formData.avatar, avatar)
                    .then(img => { images.avatar = img }))
            imgUploads
                .push(sendImage(formData.profileCover, profileCover)
                    .then(img => { images.profileCover = img }))

            Promise.all(imgUploads).then(() => {
                const {firstName, lastName, gender, birthDate, email, location} = formData
                updateProfile(({...images, firstName, lastName, gender, birthDate, email, location})).then(handleClose)
            })
        }
    }

    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <Typography variant="subtitle1" component="div" className={classes.header}>
                Edit profile
            </Typography>
            <div className={classes.avatarBg}>
                <input
                    className={classes.hidden}
                    id="bg-img-file"
                    type="file"
                    onChange={handleBackgroundChange}
                />
                <label htmlFor="bg-img-file">
                    <IconButton
                        color="primary"
                        className={classNames(classes.uploadImgBtn, classes.uploadBgBtn)}
                        aria-label="Upload"
                        component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatarImg} src={formData.avatar.url}/>
                    <input
                        className={classes.hidden}
                        id="avatar-img-file"
                        type="file"
                        onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-img-file">
                        <IconButton
                            color="primary"
                            className={classNames(classes.uploadImgBtn, classes.uploadAvatarBtn)}
                            aria-label="Upload"
                            component="span">
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                </div>
            </div>

            <Typography variant="subtitle1" component="div" className={classes.header}>
                Personal information
            </Typography>
            <Grid container className={classes.sectionContainer}>
                <Grid item xs={6}>
                    <TextField
                        className={classes.textInput}
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        label="First name"
                        value={formData.firstName}
                        onChange={onChange}
                    />
                    <br/>
                    <TextField
                        className={classes.textInput}
                        name="lastName"
                        variant="outlined"
                        required
                        fullWidth
                        label="Last name"
                        value={formData.lastName}
                        onChange={onChange}
                    />
                    <br/>
                    <TextField
                        className={classes.textInput}
                        name="email"
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        value={formData.email}
                        onChange={onChange}
                        error={formData.emailError !== ''}
                        helperText={formData.emailError}
                    />
                    <br/>
                    <TextField
                        className={classes.textInput}
                        name="birthDate"
                        label="Birth date"
                        type="date"
                        variant="outlined"
                        value={parseMillisToStringDate(formData.birthDate)}
                        onChange={onBirthDateChange}
                        style={{alignSelf: 'center'}}
                    />
                    <br/>
                    <FormControl component="fieldset" className={classes.ageRadioSet}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="gender" value={formData.gender} onChange={onChange}>
                            <FormControlLabel
                                value="FEMALE"
                                control={<Radio size="small" className={classes.radioBtn}/>}
                                label="Female"
                                className={classes.ageRadioBtn}
                                labelPlacement={'end'}
                            />
                            <FormControlLabel
                                value="MALE"
                                control={<Radio size="small" className={classes.radioBtn}/>}
                                label="Male"
                                className={classes.ageRadioBtn}
                                labelPlacement={'end'}
                            />
                            <FormControlLabel
                                value="OTHER"
                                control={<Radio size="small" className={classes.radioBtn}/>}
                                label="Other"
                                className={classes.ageRadioBtn}
                                labelPlacement={'end'}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item container xs={6}>
                    <Autocomplete
                        id="google-map-demo"
                        name="location"
                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={formData.location}
                        onChange={(event, newValue) => {
                            setOptions(newValue ? [newValue, ...options] : options)
                            setValue(newValue)
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue)

                        }}
                        renderInput={(params) => (
                            <TextField {...params}
                                       label="Location"
                                       variant="outlined"
                                       fullWidth
                                       style={{margin: '5px 0'}}
                            />
                        )}
                        renderOption={(option) => {
                            const matches = option.structured_formatting.main_text_matched_substrings
                            const parts = parse(
                                option.structured_formatting.main_text,
                                matches.map((match) => [match.offset, match.offset + match.length]),
                            )

                            return (
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <LocationOnIcon className={classes.icon}/>
                                    </Grid>
                                    <Grid item xs>
                                        {parts.map((part, index) => (
                                            <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
                                                {part.text}
                                            </span>
                                        ))}
                                        <Typography variant="body2" color="textSecondary">
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        }}
                        style={{width: '100%'}}
                    />
                </Grid>
            </Grid>
            <Grid container alignContent="center" justify="flex-end" className={classes.btnSection}>
                <Button variant="contained" className={classes.buttonCancel} onClick={handleClose}>
                    Cancel
                </Button>

                <Button type="submit" className={classes.buttonSave} variant="contained">
                    Save changes
                </Button>
            </Grid>
        </form>
    )
}

UpdateProfile.propTypes = {
    user: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (formData) => dispatch(updateProfile(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
