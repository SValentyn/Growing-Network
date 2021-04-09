import {makeStyles} from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles((props) => ({
    root: props => ({
        height: props.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.CONTAINER_BG_COLOR
    })
}))

export default useStyles
