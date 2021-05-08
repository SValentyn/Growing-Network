import {makeStyles} from '@material-ui/core/styles'
import {colors} from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
        active: {
            boxShadow: `inset 7px 0px 0px ${styleConstants.PRIMARY_COLOR}`,
            backgroundColor: colors.grey[50]
        },
        avatar: {
            height: styleConstants.AVATAR_SIZE_MID,
            width: styleConstants.AVATAR_SIZE_MID,
            fontSize: 19,
            borderRadius: '50%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
        },
        avatarSmall: {
            height: 30,
            width: 30,
            marginTop: 8,
            fontSize: 14,
            borderRadius: '50%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
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
