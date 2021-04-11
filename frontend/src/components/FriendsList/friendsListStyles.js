import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        textAlign: 'left'
    },
    header: {
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        padding: '8px 10px',
        fontWeight: 500,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR
    },
    count: {
        color: styleConstants.CONTAINER_COUNT_COLOR,
        fontWeight: 500
    },
    gridContainer: {
        maxWidth: 670,
        margin: '0 auto',
        padding: '8px 10px'
    },
    notification: {
        margin: '10px auto'
    }
}))

export default useStyles
