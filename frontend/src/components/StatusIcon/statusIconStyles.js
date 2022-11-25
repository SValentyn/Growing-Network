import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: theme.spacing(1),
        width: theme.spacing(1),
        display: 'inline-block',
        flexGrow: 0,
        flexShrink: 0,
        borderRadius: '50%',
    },
    active: {
        backgroundColor: colors.green[600]
    },
    recently: {
        backgroundColor: colors.yellow[600]
    },
    inActive: {
        backgroundColor: colors.red[600]
    }
}))

export default useStyles
