import { fade, makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        background: styleConstants.NAVBAR_BG_COLOR
    },
    toolbar: {
        minHeight: 63
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
        marginLeft: '14px',
        lineHeight: 1.6,
        fontWeight: 500,
        background: 'linear-gradient(135deg, #00dcff 0%, #1158f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    searchContainer: {
        width: 287,
        maxWidth: 287,
        marginLeft: 10
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    logoImage: {
        width: '40px',
        height: '40px'
    },
    navbarButton: {
        margin: theme.spacing(1),
        position: 'relative',
        display: 'inline-block',
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
        padding: 7,
        height: 'min-content',
        outline: 'none',
        background: styleConstants.BTN_BG_COLOR,
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER
        },
        '&:active': {
            background: styleConstants.BTN_BG_ACTIVE
        }
    }
}))

export default useStyles
