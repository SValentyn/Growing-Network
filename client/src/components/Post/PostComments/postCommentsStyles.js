import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    createPanel: {
        padding: '10px 15px'
    },
    avatar: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        margin: '5px 15px 5px 10px',
        boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
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
