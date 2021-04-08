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
        borderRadius: '50%',
        width: 40,
        height: 40,
        margin: '5px 15px 5px 10px'
    },

    optionWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    searchInput: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            height: 45,
            '& .MuiAutocomplete-input': {
                color: 'white',
                padding: '5px 0 5px 35px'
            }
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
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
        borderWidth: '1px',
        borderColor: `${styleConstants.PRIMARY_COLOR} !important`
    }
}))

export default useStyles
