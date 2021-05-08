import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        padding: '5px 5px'
    },
    user: {
        display: 'flex',
        margin: 'auto 0'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        width: styleConstants.AVATAR_SIZE_MID,
        height: styleConstants.AVATAR_SIZE_MID,
        fontSize: 19,
        borderRadius: '50%',
        margin: '5px 15px 5px 10px',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
    },
    userName: {
        margin: '5px 0 0'
    },
    arrowRight: {
        size: '5px',
        width: 20,
        height: 20
    },
    lineBelowUsername: {
        display: 'flex',
        margin: '0 0 3px'
    },
    userFullName: {
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left'
    },
    authorLink: {
        fontWeight: 600,
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    tagLink: {
        fontWeight: 600,
        color: styleConstants.PRIMARY_COLOR,
        textDecoration: 'none'
    },
    postDate: {
        margin: '1px 0',
        textAlign: 'left',
        lineHeight: '16px',
        fontSize: 11
    }
}))

export default useStyles
