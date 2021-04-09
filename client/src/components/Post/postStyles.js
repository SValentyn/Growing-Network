import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    post: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR,
        borderRadius: 4,
        textAlign: 'center',
        marginBottom: 20,
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
    },
    image: {
        width: '100%'
    },
    postText: {
        padding: '0 15px',
        color: styleConstants.PRIMARY_COLOR
    }
}))

export default useStyles
