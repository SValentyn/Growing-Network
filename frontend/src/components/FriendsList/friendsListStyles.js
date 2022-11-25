import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        textAlign: 'left'
    },
    header: {
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        fontSize: '20px',
        padding: '4px 16px',
        fontWeight: 500,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
        paddingRight: 24
    },
    count: {
        color: styleConstants.CONTAINER_COUNT_COLOR,
        fontWeight: 500
    },
    gridContainer: {
        margin: '0 auto',
        padding: '3% 11%'
    },
    notification: {
        margin: '10px auto'
    }
}))

export default useStyles
