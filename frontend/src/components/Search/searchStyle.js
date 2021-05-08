import {fade, makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    link: {
        width: '100%',
        height: 45,
        display: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'black'
    },
    userPhoto: {
        width: styleConstants.AVATAR_SIZE_MID,
        height: styleConstants.AVATAR_SIZE_MID,
        fontSize: 19,
        margin: '5px 10px 5px 0',
        borderRadius: '50%'
    },
    optionWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchInput: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            height: 45,
            border: '1px solid #ffffff',
            '& .MuiAutocomplete-input': {
                color: '#14171a',
                padding: '5px 0 5px 35px'
            }
        }
    },
    search: {
        position: 'relative',
        borderRadius: 5,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        color: 'black',
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${styleConstants.ICON_COLOR} !important`
        }
    },
    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px'
    }
}))

export default useStyles
