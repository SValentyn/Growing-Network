import {makeStyles} from '@material-ui/core'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    header: {
        padding: '8px 10px',
        paddingRight: '24px',
        backgroundColor: '#f5f6f7',
        borderBottom: '1px solid #dddfe2',
        borderRadius: '4px 4px 0 0',
        fontWeight: '900',
        color: '#1c1e21'
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
        backgroundColor: '#EAEAEA',
        color: styleConstants.PRIMARY_COLOR
    },
    uploadAvatarBtn: {
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 30%)'
    },
    uploadBgBtn: {
        top: 10,
        left: 10
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
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    sectionContainer: {
        padding: '15px 20px 5px'
    },
    textInput: {
        margin: '5px 10px'
    },
    ageRadioSet: {
        paddingLeft: 30
    },
    ageRadioBtn: {
        height: 30

    },
    btnSection: {
        padding: '10px 20px'
    },
    summaryBtn: {
        padding: '5px 15px',
        marginRight: 5
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
