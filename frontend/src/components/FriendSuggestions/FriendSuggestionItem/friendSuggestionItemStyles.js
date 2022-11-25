import { makeStyles } from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        padding: '5px 4px 5px 12px'
    },
    image: {
        width: styleConstants.AVATAR_SIZE_MID,
        height: styleConstants.AVATAR_SIZE_MID,
        marginRight: 15,
        fontSize: 19,
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    },
    name: {
        boxSizing: 'border-box',
        fontWeight: '600'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    sendIcon: {
        color: styleConstants.ICON_COLOR,
        padding: 10,
        '&:hover': {
            backgroundColor: 'rgb(15 135 220 / 9%)'
        }
    },
    requestSentIcon: {
        padding: 10,
        color: styleConstants.ICON_COLOR
    },
    commonFriendsWrapper: {
        margin: '2px 0 0px 0px',
        fontSize: 14
    },
    commonFriendAvatar: {
        width: 22,
        height: 22,
        bottom: 3,
        marginLeft: 6,
        fontSize: 11,
        borderRadius: '50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    }
}))

export default useStyles
