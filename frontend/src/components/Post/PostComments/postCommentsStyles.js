import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    createPanel: {
        padding: '10px 15px'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        width: 34,
        height: 34,
        margin: '0px 5px 8px 0',
        fontSize: 15,
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    },
    createInput: {
        margin: 0,
        padding: 10,
        '&:hover': {
            borderWidth: '1px',
            borderColor: `${styleConstants.PRIMARY_COLOR} !important`
        }
    },
    iconEmojiPickerContainerWithoutHover: {
        '&:hover': {
            backgroundColor: 'unset'
        },
    },
    iconEmojiPicker: {
        padding: 2,
        fontSize: 24,
        verticalAlign: 'middle',
        '&:hover': {
            '#picker': {
                display: 'block',
            }
        },
    },
    inputMultiline: {
        fontFamily: 'Montserrat, Poppins, Open Sans Condensed, sans-serif',
    },
    cssOutlinedInput: {
        '&:before': {
            borderBottom: '1px solid #dddfe2',
        },
        '&&&&:hover:before': {
            borderBottom: '1px solid #000',
        },
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
