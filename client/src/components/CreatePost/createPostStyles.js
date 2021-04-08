import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: 20
    },
    header: {
        padding: '8px 10px',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '4px 4px 0 0',
        fontWeight: 900,
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR
    },
    textContainer: {
        padding: '10px 15px 10px 10px'
    },
    avatar: {
        height: styleConstants.AVATAR_SIZE_MID,
        width: styleConstants.AVATAR_SIZE_MID,
        boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
    },
    postInput: {
        borderStyle: 'none',
        borderRadius: 4,
        background: 'white',
        marginLeft: 5
    },
    imgPreviewContainer: {
        padding: 5
    },
    titleBar: {
        height: 30,
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ' +
            'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)'
    },
    iconButton: {
        color: 'white'
    },
    toolsContainer: {
        padding: '5px 10px'
    },
    errorImg: {
        border: '3px solid red'
    },
    button: {
        position: 'relative',
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
        padding: 0,
        margin: 5,
        background: styleConstants.BTN_BG_COLOR,
        boxShadow: styleConstants.BTN_SHADOW,
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER
        },
        '&:active': {
            top: 1,
            background: styleConstants.BTN_BG_ACTIVE,
            boxShadow: styleConstants.BTN_SHADOW_ACTIVE
        }
    },
    label: {
        padding: '5px 10px'
    },
    icon: {
        verticalAlign: 'middle',
        display: 'inline-block'
    },
    labelText: {
        verticalAlign: 'middle',
        display: 'inline-block',
        lineHeight: '18px'
    },
    fileInput: {
        display: 'none'
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
