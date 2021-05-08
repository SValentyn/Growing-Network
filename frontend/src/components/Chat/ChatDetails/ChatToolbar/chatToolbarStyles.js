import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        flex: '0 0 auto'
    },
    backButton: {
        marginRight: theme.spacing(2)
    },
    user: {
        flexShrink: 0,
        flexGrow: 1
    },
    otherParticipant: {
        margin: 0,
        color: styleConstants.PRIMARY_COLOR
    },
    otherParticipantLink: {
        textDecoration: 'none',
        color: styleConstants.PRIMARY_COLOR,
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.33,
        verticalAlign: 'top'
    },
    activity: {
        display: 'flex',
        alignItems: 'center'
    },
    statusIcon: {
        marginRight: theme.spacing(1)
    },
    search: {
        height: 42,
        padding: theme.spacing(0, 2),
        display: 'flex',
        alignItems: 'center',
        flexBasis: 300,
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            flex: '1 1 auto'
        }
    },
    searchIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.icon
    },
    searchInput: {
        flexGrow: 1
    }
}))

export default useStyles
