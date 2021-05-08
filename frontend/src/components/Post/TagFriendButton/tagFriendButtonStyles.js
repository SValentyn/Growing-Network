import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
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
        display: 'inline-block',
        fontSize: 21,
        padding: '1.5px 0'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        width: 25,
        height: 25,
        marginRight: 5,
        fontSize: 11,
        borderRadius: '50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    labelText: {
        verticalAlign: 'middle',
        display: 'inline-block',
        paddingLeft: '6px',
        lineHeight: '18px'
    },
    checkedIcon: {
        width: 18,
        height: 18,
        margin: '0 5px 0 -5px',
        verticalAlign: 'middle',
        color: '#6fc700',
    },
    userPic: {
        width: 25,
        height: 25,
        marginRight: 5,
        borderRadius: '50%'
    }
}))

export default useStyles
