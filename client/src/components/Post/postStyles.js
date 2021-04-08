import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    post: {
        color: styleConstants.CONTAINER_TEXT_COLOR,
        background: styleConstants.CONTAINER_BG_COLOR,
        borderRadius: 4,
        textAlign: 'center',
        marginBottom: 20,
        boxShadow: '0 1px rgba(255,255,255,.2) inset, 0 3px 5px rgba(0,1,6,.5), 0 0 1px 1px rgba(0,1,6,.2)'
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
