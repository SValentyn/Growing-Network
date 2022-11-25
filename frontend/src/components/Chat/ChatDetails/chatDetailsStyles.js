import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.white
    },
    fullHeight: {
        height: 'calc(100vh - 63px)'
    },
    halfHeight: {
        height: 'calc(100vh - 400px)'
    }
}))

export default useStyles
