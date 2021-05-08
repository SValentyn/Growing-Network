import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    panel: {
        textAlign: 'center',
        borderTop: '1px solid #dddfe2',
        borderBottom: '1px solid #dddfe2',
        padding: '4px 0 2px 0',
        marginTop: -4
    },
    container: {
        display: 'flex'
    },
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        width: 30,
        height: 30,
        margin: '3px 7px 3px 3px',
        fontSize: 13,
        borderRadius: '50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    userContainer: {
        margin: 'auto 0'
    },
    text: {
        display: 'flex',
        textAlign: 'left',
        margin: 0
    },
    iconButton: {
        padding: 10,
    },
    likeIconButton: {
        '&:hover': {
            background: 'rgb(255 0 0 / 16%)'
        }
    }
}))

export default useStyles
