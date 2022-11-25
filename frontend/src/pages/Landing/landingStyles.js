import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    buttons: {
        marginRight: 50
    },

    btns_container: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    link: {
        textDecoration: 'none',
        color: 'white'
    }
}))

export default useStyles
