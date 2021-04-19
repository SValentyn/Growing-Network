import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    avatar: props => ({
        paddingTop: 100,
        width: 100,
        backgroundImage: `url(${props.avatar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        position: 'relative'
    }),
    gridItem: {
        display: 'flex',
        borderRadius: 5,
        margin: 10,
        minWidth: 300
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 0 0 16px'
    },
    userName: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        fontWeight: 600,
        margin: 0,
        wordBreak: 'break-word'
    },
    link: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    requestDate: {
        margin: 0,
        wordBreak: 'break-word'
    },
    confirmBtn: {
        color: '#8bc34a'
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
