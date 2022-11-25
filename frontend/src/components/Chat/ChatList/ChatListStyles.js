import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white
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

    },
    chatListContainer: {
        height: 'calc(100vh - 128px)',
        overflowX: 'hidden',
        overflowY: 'scroll'
    }
}))

export default useStyles
