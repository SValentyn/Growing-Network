import {makeStyles} from '@material-ui/core/styles'
import {colors} from '@material-ui/core'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    ownMessage: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& $body': {
            backgroundColor: styleConstants.PRIMARY_COLOR,
            color: styleConstants.CONTAINER_HEADER_TEXT_COLOR
        }
    },
    inner: {
        display: 'flex',
        maxWidth: 500
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    body: {
        backgroundColor: colors.grey[100],
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 2)
    },
    image: {
        marginTop: theme.spacing(2),
        height: 'auto',
        width: 380,
        maxWidth: '100%'
    },
    footer: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

export default useStyles
