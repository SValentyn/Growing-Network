import {makeStyles} from '@material-ui/core'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    container: {
        minWidth: 250,
        marginBottom: 20
    },
    header: {
        padding: '8px 10px',
        paddingRight: '24px',
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '4px 4px 0 0',
        fontWeight: '500',
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR
    },
    notification: {
        textAlign: 'center',
        paddingBottom: 16
    }
}))

export default useStyles
