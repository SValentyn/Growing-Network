import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
    panel: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 10px',
        borderBottom: '1px solid rgb(188,188,189)'
    },
    link: {
        textDecoration: 'none',
        color: styleConstants.CONTAINER_TEXT_COLOR
    },
    userPhoto: {
        borderRadius: '50%',
        width: 32,
        height: 32,
        margin: '0 2px 0 15px',
        boxShadow: '0 1px rgb(255 255 255 / 5%) inset, 0 1px 15px rgb(0 1 0 / 5%), 0 0 1px 1px rgb(0 1 6 / 5%)',
    },
    comment: {
        textAlign: 'left',
        paddingLeft: 10
    },
    commentText: {
        margin: 0,
        wordBreak: 'break-word'
    },
    commentAuthor: {
        fontWeight: 600,
        marginRight: 5
    },
    commentDate: {
        margin: '2px 0 0 0',
        fontSize: 10,
        color: '#999'
    },
    deleteComment: {
        alignSelf: 'start',
        padding: 11
    }
}))

export default useStyles
