import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        overflow: 'hidden'
    },
    chatList: {
        width: 350,
        flexBasis: 350,
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`
    },
    chatDetails: {
        flexGrow: 1
    },
    chatPlaceholder: {
        flexGrow: 1
    }
}))

export default useStyles
