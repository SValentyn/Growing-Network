import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    container: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR
    },
    btnMenu: {
        margin: 7,
        padding: 5,
        color: styleConstants.PRIMARY_COLOR
    },
    button: {
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
    grow: {
        transformOrigin: 'center bottom'
    },
    menuItemIcon: {
        marginRight: 10
    }
}))

export default useStyles
