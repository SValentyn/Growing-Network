import {makeStyles} from '@material-ui/core'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    paper: {
        marginRight: theme.spacing(2),
        maxHeight: 350,
        overflowY: 'scroll'
    },
    tagLink: {
        fontWeight: 600,
        color: styleConstants.PRIMARY_COLOR,
        textDecoration: 'none'
    },
    menuLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:visited': {
            color: 'inherit'
        }
    },
    userPic: {
        borderRadius: '50%',
        width: 25,
        height: 25,
        marginRight: 5
    },
    selectFullName: {
        margin: 0
    }
}))

export default useStyles
