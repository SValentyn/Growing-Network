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
        margin: 0,
        fontSize: 10,
        color: '#999'
    }
}))

export default useStyles
