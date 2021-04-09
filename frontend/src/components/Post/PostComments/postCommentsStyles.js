import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    createPanel: {
        padding: '10px 15px'
    },
    avatar: {
        borderRadius: '50%',
        width: 32,
        height: 32,
        margin: '5px 15px 5px 10px'
    },
    createInput: {
        background: 'white',
        borderRadius: 4
    },
    footerText: {
        fontSize: 12,
        textAlign: 'left',
        color: '#90949c',
        margin: '5px 0 0 1px'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${styleConstants.ICON_COLOR} !important`
        }
    },
    cssFocused: {},
    notchedOutline: {
        borderWidth: '1px',
        borderColor: `${styleConstants.CONTAINER_BG_COLOR} !important`
    }
}))

export default useStyles