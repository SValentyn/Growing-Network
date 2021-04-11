import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../../utils/constants/styleConstants'

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
        display: 'inline-block'
    },
    labelText: {
        verticalAlign: 'middle',
        display: 'inline-block',
        paddingLeft: '6px',
        lineHeight: '18px'
    },
    checkedIcon: {
        paddingTop: 5,
        width: 18,
        height: 18,
        color: '#6fc700',
        verticalAlign: 'middle'
    },
    userPic: {
        borderRadius: '50%',
        width: 25,
        height: 25,
        marginRight: 5
    }
}))

export default useStyles
