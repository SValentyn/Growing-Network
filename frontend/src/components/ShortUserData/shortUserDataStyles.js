import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: 20
    },
    header: {
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        fontSize: '20px',
        padding: '4px 16px',
        fontWeight: 500,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        letterSpacing: '-0.04em'
    },
    textContainer: {
        padding: '6px 15px',
        '& > *': {
            margin: 2
        }
    },
    textSpan: {
        width: 80,
        display: 'inline-flex'
    }
}))

export default useStyles
