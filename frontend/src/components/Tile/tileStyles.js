import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    image: (props) => ({
        paddingTop: '100%',
        backgroundImage: `url(${props.image})`,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        borderRadius: 8,
        cursor: 'pointer'
    }),
    userLink: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR,
        textAlign: 'center'
    },
    userPhoto: {
        width: 'auto',
        height: 0,
        paddingTop: '50%',
        paddingBottom: '50%',
        borderRadius: '50%',
        backgroundImage: 'none',
        position: 'relative',
        fontSize: 'calc(1em + 2vw)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
        cursor: 'pointer'
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
