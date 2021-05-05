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
        maxWidth: 650
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    body: {
        maxWidth: 620,
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
