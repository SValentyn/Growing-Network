import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: 20
    },
    header: {
        padding: '8px 16px',
        paddingRight: 24,
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        color: styleConstants.CONTAINER_HEADER_TEXT_COLOR,
        borderBottom: '1px solid #dddfe2',
        borderRadius: '5px 5px 0 0',
        fontWeight: 500
    },
    textContainer: {
        padding: '10px 15px 4px 10px'
    },
    avatar: {
        height: styleConstants.AVATAR_SIZE_MID,
        width: styleConstants.AVATAR_SIZE_MID
    },
    postInput: {
        width: '98%',
        margin: '3px 0 0 8px',
        background: 'white',
        borderRadius: 5,
        border: '1px solid #dddfe2'
    },
    inputMultiline: {
        fontFamily: 'Open Sans Condensed'
    },
    footerText: {
        fontSize: 11,
        textAlign: 'right',
        color: '#8c8f92',
        margin: '-5px 0 0 0'
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
        padding: '5px 10px 8px'
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
        transition: '.2s ease-in-out',
        '&:hover:not(:active)': {
            background: styleConstants.BTN_BG_HOVER
        },
        '&:active': {
            top: 1,
            background: styleConstants.BTN_BG_ACTIVE
        }
    },
    label: {
        padding: '4px 10px'
    },
    icon: {
        verticalAlign: 'middle',
        display: 'inline-block'
    },
    labelText: {
        verticalAlign: 'middle',
        display: 'inline-block',
        paddingLeft: '6px',
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
