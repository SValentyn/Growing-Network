import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto 0',
        borderBottom: '1px solid #e6e6e6',
        padding: '5px 10px'
    },
    header: {
        padding: '8px 16px',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
        fontWeight: 500
    },
    count: {
        color: styleConstants.CONTAINER_COUNT_COLOR,
        fontWeight: 500
    },
    scrollContainer: {
        maxHeight: 459,
        position: 'relative',
        overflow: 'auto'
    },
    notification: {
        textAlign: 'center',
        paddingBottom: 16
    },
    user: {
        display: 'flex'
    },
    userPhoto: {
        borderRadius: '50%',
        width: 48,
        height: 48,
        marginRight: 15,
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
    },
    userName: {
        margin: 'auto 0'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userFullName: {
        display: 'flex',
        fontWeight: 500,
        margin: 0,
        textAlign: 'left'
    },
    activeTime: {
        margin: 0,
        textAlign: 'left',
        lineHeight: '16px'
    },
    sendMessage: {
        color: styleConstants.ICON_COLOR
    }

}))

export default useStyles
