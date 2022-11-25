import { makeStyles } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'
import styleConstants from '../../utils/constants/styleConstants'

export const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: styleConstants.ICON_COLOR
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    margin: {
        margin: theme.spacing(1)
    }
}))
