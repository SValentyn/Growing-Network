import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    button: {
        position: 'absolute',
        padding: '4px 4px',
        bottom: '10px',
        right: '10px',
        border: 0,
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        background: styleConstants.BTN_BG_COLOR,
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER,
        },
        '&:active': {
            background: styleConstants.BTN_BG_ACTIVE
        }
    }
}))
export default useStyles
