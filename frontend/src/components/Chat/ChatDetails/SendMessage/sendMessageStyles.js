import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        '& .MuiIconButton-colorPrimary': {
            color: styleConstants.PRIMARY_COLOR
        }
    },
    paper: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        padding: theme.spacing(0.5, 2)
    }

}))

export default useStyles
