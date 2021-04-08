import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    image: props => ({
        paddingTop: '100%',
        backgroundImage: `url(${props.image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        position: 'relative',
    }),
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR,
        textAlign: 'center'
    },
    title: {
        margin: '10px 0 0',
        wordBreak: 'break-word'
    },
    imageModal: {
        width: '100%'
    }
}))

export default useStyles
