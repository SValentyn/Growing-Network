import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        padding: '5px 10px'
    },
    image: {
        borderRadius: '50%',
        width: 42,
        height: 42,
        marginRight: 15,
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    },
    name: {
        paddingTop: 12,
        boxSizing: 'border-box',
        fontWeight: '600'
    },
    link: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    sendIcon: {
        color: styleConstants.ICON_COLOR
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
        borderRadius: '50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    }
}))

export default useStyles
