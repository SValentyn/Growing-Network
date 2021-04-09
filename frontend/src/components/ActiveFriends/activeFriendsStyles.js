import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    header: {
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        padding: '8px 10px',
        fontWeight: 500,
        borderBottom: '1px solid rgb(188,188,189)',
        borderRadius: '4px 4px 0 0',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR
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
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto 0',
        borderBottom: '1px solid #e6e6e6',
        padding: '5px 10px'
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
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
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
        fontWeight: 600,
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
