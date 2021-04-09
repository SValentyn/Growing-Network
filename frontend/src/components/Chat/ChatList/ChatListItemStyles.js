import {makeStyles} from '@material-ui/core/styles'
import {colors} from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
        active: {
            boxShadow: `inset 7px 0px 0px ${styleConstants.PRIMARY_COLOR}`,
            backgroundColor: colors.grey[50]
        },
        avatar: {
            height: 40,
            width: 40
        },
        avatarSmall: {
            marginTop: 8,
            height: 30,
            width: 30,
            '&:last-child': {
                transform: 'translate(15px, -15px)',
                marginTop: 0
            }
        },
        details: {
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& .MuiBadge-anchorOriginTopRightRectangle': {
                top: -12,
                right: 9
            }
        },
        unread: {
            marginTop: 2,
            padding: 2,
            height: 18,
            minWidth: 18
        }
    })
)

export default useStyles
