import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: 20
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
    textContainer: {
        padding: '6px 10px',
        '& > *': {
            margin: 2
        }
    },
    textSpan: {
        fontWeight: 600
    }
}))

export default useStyles
