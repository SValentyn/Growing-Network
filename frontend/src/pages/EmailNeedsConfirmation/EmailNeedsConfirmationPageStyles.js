import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    icon: {
        color: styleConstants.PRIMARY_COLOR,
        fontSize: '100px',
        margin: '20px auto',
        display: 'block'
    }

}))

export default useStyles
