import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(8)
    },
    paper: {
        width: 440,
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR,
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
        padding: '20px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: styleConstants.PRIMARY_COLOR,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button: {
        position: 'relative',
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
        background: styleConstants.BTN_BG_COLOR,
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER
        },
        '&:active': {
            top: 1,
            background: styleConstants.BTN_BG_ACTIVE
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 0)
    },
    googleBtn: {
        margin: theme.spacing(1, 0)
    },
    googleIcon: {
        marginRight: theme.spacing(1),
        width: 20
    },
    link: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    cssLabel: {
        color: styleConstants.PRIMARY_COLOR
    },
    cssOutlinedInput: {
        background: 'none',
        borderRadius: 5,
        '&$cssFocused': {
            background: 'white'
        },
        '&$cssFocused $notchedOutline': {
            borderColor: `${styleConstants.ICON_COLOR} !important`
        }
    },
    cssFocused: {
        color: `${styleConstants.PRIMARY_COLOR} !important`
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: `${styleConstants.PRIMARY_COLOR} !important`
    }
}))

export default useStyles
