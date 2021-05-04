import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
    },
    header: {
        padding: '8px 20px',
        paddingRight: '24px',
        backgroundColor: '#f5f6f7',
        borderBottom: '1px solid #dddfe2',
        borderRadius: '10px 10px 0 0',
        fontWeight: '500',
        color: '#1c1e21',
    },
    avatarBg: props => ({
        backgroundImage: `url(${props.profileCover})`,
        height: 250,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative'
    }),
    hidden: {
        display: 'none'
    },
    uploadImgBtn: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#eaeaea',
        color: styleConstants.PRIMARY_COLOR
    },
    uploadAvatarBtn: {
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 30%)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        }
    },
    uploadBgBtn: {
        top: 10,
        left: 10,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }
    },
    avatarContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    avatarImg: {
        width: 125,
        height: 125,
        border: '3px solid white',
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    sectionContainer: {
        padding: '30px 34px 18px 34px'
    },
    textInput: {
        width: '98%',
        margin: '5px 0'
    },
    ageRadioSet: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center'
    },
    ageRadioBtn: {
        height: 30
    },
    btnSection: {
        padding: '0px 34px 30px'
    },
    buttonCancel: {
        position: 'relative',
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
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
    buttonSave: {
        position: 'relative',
        marginLeft: 8,
        color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
        textShadow: '0 -1px 2px rgba(0,0,0,.2)',
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
    summaryBtnPrimary: {
        padding: '5px 15px',
        marginRight: 5,
        backgroundColor: styleConstants.PRIMARY_COLOR
    },
    cssLabel: {
        color: styleConstants.PRIMARY_COLOR
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${styleConstants.ICON_COLOR} !important`
        }
    },
    cssFocused: {
        color: `${styleConstants.PRIMARY_COLOR} !important`
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: `${styleConstants.PRIMARY_COLOR} !important`
    },
    radioBtn: {
        color: `${styleConstants.PRIMARY_COLOR} !important`
    }
}))

export default useStyles
