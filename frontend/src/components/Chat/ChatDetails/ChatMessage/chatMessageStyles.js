import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    ownMessage: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& $body': {
            whiteSpace: 'pre-line',
            backgroundColor: 'white'
        },
        '& $footer': {
            justifyContent: 'flex-end'
        }
    },
    inner: {
        display: 'flex',
        maxWidth: '50%',
    },
    userLink: {
        textDecoration: 'none !important',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        height: styleConstants.AVATAR_SIZE_MID,
        width: styleConstants.AVATAR_SIZE_MID,
        marginRight: theme.spacing(2),
        fontSize: 19,
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)'
    },
    body: {
        maxWidth: '95%',
        backgroundColor: '#f0f0f0',
        color: styleConstants.CONTAINER_TEXT_COLOR,
        padding: '8px 12px',
        border: '1px solid #dddfe2',
        borderRadius: 5,
        wordWrap: 'break-word',
        overflowWrap: 'anywhere'
    },
    image: {
        marginTop: theme.spacing(2),
        height: 'auto',
        width: 380,
        maxWidth: '100%'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-start'
    }
}))

export default useStyles
