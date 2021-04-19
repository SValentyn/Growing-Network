import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: 20,
    },
    header: {
        display: 'flex',
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        fontSize: '19.3px',
        padding: '4px 16px',
        fontWeight: 500,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
    },
    headerTitle: {
        color: styleConstants.CONTAINER_COUNT_COLOR,
        textDecoration: 'none',
        fontWeight: 500,
        alignSelf: 'center',
        '&:hover': {
            textDecoration: 'none',
            color: 'rgb(22 118 196)'
        }
    },
    gridContainer: {
        padding: '8px 15px'
    },
    notification: {
        margin: '10px auto'
    }
}))

export default useStyles
