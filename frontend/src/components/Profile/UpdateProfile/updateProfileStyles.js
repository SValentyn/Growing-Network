import { makeStyles } from '@material-ui/core'
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
    avatarBg: (props) => ({
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
    colorPicker: {
        width: '0px !important',
        height: '0px !important',
        left: '20%',
        bottom: 0,
        position: 'absolute !important',
        backgroundColor: 'transparent !important',
        border: 'unset !important',
        '& span': {
            width: '35px !important',
            height: '35px !important',
            left: '20%',
            bottom: -1,
            position: 'absolute !important',
            display: 'grid !important',
            transform: 'translate(-50%, 30%)',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #ffffff !important',
            borderRadius: '50% !important',
            cursor: 'pointer'
        }
    },
    uploadImgBtn: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: '#eaeaea',
        color: styleConstants.PRIMARY_COLOR
    },
    uploadAvatarBtn: {
        bottom: 0,
        left: '80%',
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
        fontSize: 56,
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
    genderRadioSet: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    genderBtn: {
        height: 18,
        width: 18,
        marginRight: -2,
    },
    genderFemaleRadioBtn: {
        '&:hover:not(:active)': {
            background: 'rgb(255 0 207 / 16%)'
        }
    },
    genderMaleRadioBtn: {
        '&:hover:not(:active)': {
            background: 'rgb(0 119 255 / 16%)'
        }
    },
    genderOtherRadioBtn: {
        '&:hover:not(:active)': {
            background: 'rgb(0 0 0 / 11%)'
        }
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
}))

export default useStyles
