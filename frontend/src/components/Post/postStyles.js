import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    post: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR,
        borderRadius: 5,
        textAlign: 'left',
        marginBottom: 22,
        boxShadow: '0 1px rgb(255 255 255 / 15%) inset, 0 1px 15px rgb(0 1 0 / 15%), 0 0 1px 1px rgb(0 1 6 / 15%)',
    },
    postText: {
        margin: 0,
        padding: '2px 20px 14px',
        color: styleConstants.PRIMARY_COLOR,
        wordBreak: 'break-all'
    },
    imageContainer: {
        textAlign: 'center'
    },
    image: {
        maxWidth: '100%',
        minHeight: 400,
        maxHeight: 600
    }
}))

export default useStyles
