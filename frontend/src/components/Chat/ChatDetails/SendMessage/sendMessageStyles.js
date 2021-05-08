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
        maxHeight: 256,
        margin: '18px 16px 24px',
        padding: '8px 12px'
    },
    iconContainerWithoutHover: {
        '&:hover': {
            backgroundColor: 'unset'
        },
    },
    icon: {
        padding: 2,
        fontSize: 30,
        verticalAlign: 'middle',
        '&:hover': {
            '#picker': {
                display: 'block',
            }
        },
    },
    userPhoto: {
        width: styleConstants.AVATAR_SIZE_MID,
        height: styleConstants.AVATAR_SIZE_MID,
        fontSize: 19,
        borderRadius: '50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }
}))

export default useStyles
