import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    scrollContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box'
    },
    paper: {
        textAlign: 'left',
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR,
        borderRadius: 5,
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
    }
}))

export default useStyles
