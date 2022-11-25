import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        boxSizing: 'border-box'
    },
    avatarBg: (props) => ({
        backgroundImage: `url(${props.profileCover})`,
        height: 250,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        position: 'relative'
    }),
    avatarImg: {
        width: 175,
        height: 175,
        bottom: -90,
        left: 20,
        fontSize: 80,
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
        border: '4px solid',
        borderColor: 'white',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    editProfileIcon: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        padding: 12,
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.21)'
        }
    },
    label: {
        padding: 0
    },
    icon: {
        verticalAlign: 'middle',
        display: 'inline-block',
        paddingRight: '2px'
    },
    labelText: {
        verticalAlign: 'middle',
        display: 'inline-block',
        lineHeight: '25px'
    },
    modalContainer: {
        padding: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        border: 'none',
        outline: 'none',
        '& google-map-demo': {
            overflowY: 'scroll'
        }
    },
    avatarName: {
        fontSize: 30,
        fontWeight: 700,
        position: 'absolute',
        color: styleConstants.NAVBAR_BG_COLOR,
        bottom: -8,
        left: 240
    },
    tabContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        background: styleConstants.CONTAINER_HEADER_BG_COLOR,
        borderRadius: '0 0 5px 5px'
    },
    submenu: {
        maxWidth: 635,
        paddingRight: '5%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    submenuItem: {
        minWidth: 120,
        fontSize: 14,
        color: styleConstants.CONTAINER_TEXT_COLOR
    }
}))

export default useStyles
