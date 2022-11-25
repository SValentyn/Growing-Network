import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    avatar: {
        width: 100,
        height: 100,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        borderRadius: 8,
        cursor: 'pointer'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        height: 100,
        width: 100,
        position: 'relative',
        fontSize: 42,
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
    },
    gridItem: {
        display: 'flex',
        borderRadius: 5,
        minWidth: 300,
        maxWidth: 440,
        margin: '26px auto'
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 14px 0 16px'
    },
    userName: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        fontWeight: 600,
        margin: 0,
        wordBreak: 'break-word'
    },
    requestDate: {
        margin: 0,
        wordBreak: 'break-word'
    },
    confirmBtn: {
        color: 'limegreen',
        marginRight: 4,
        padding: 6,
        '&:hover:not(:active)': {
            background: 'rgb(22 221 22 / 16%)'
        }
    },
    deleteBtn: {
        color: 'red',
        marginRight: 4,
        padding: 6,
        '&:hover:not(:active)': {
            background: 'rgb(255 0 0 / 16%)'
        }
    },
    sendMessage: {
        color: styleConstants.ICON_COLOR,
        padding: 10,
        '&:hover': {
            backgroundColor: 'rgb(15 135 220 / 9%)'
        }
    },
    dialog: {
        marginTop: -250
    },
    modalContainer: {
        width: 500,
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR
    },
    btnMenu: {
        margin: 15,
        padding: 5,
        color: styleConstants.PRIMARY_COLOR
    },
    modalButton: {
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
    }
}))

export default useStyles
