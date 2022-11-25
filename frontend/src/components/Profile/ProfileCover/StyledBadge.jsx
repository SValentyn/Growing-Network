import { withStyles } from '@material-ui/styles'
import { Badge } from '@material-ui/core'

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: '7%',
        bottom: '-40%',
        backgroundColor: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        transform: 'scale(3) translate(50%, 50%)'
    }
}))(Badge)

export default StyledBadge