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
        border: '1px solid',
        borderColor: 'rgb(126,126,127)',
        borderRadius: 4,
        margin: 10,
        minWidth: 300,
        boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
    },
    friendInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 10px'
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
        color: styleConstants.ICON_COLOR
    },
    modalContainer: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR
    },
    modalButton: {
        position: 'relative',
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
        background: styleConstants.BTN_BG_COLOR,
        boxShadow: styleConstants.BTN_SHADOW,
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER
        },
        '&:active': {
            top: 1,
            background: styleConstants.BTN_BG_ACTIVE,
            boxShadow: styleConstants.BTN_SHADOW_ACTIVE
        }
    }

}))

export default useStyles
