import withStyles from '@material-ui/core/styles/withStyles'
import { Tooltip } from '@material-ui/core'

export const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'unset',
        padding: 0,
        '& .emoji-mart': {
            right: -114,
            bottom: 80,
            position: 'absolute',
            minWidth: '295px !important',
            maxWidth: '295px !important'
        },
        '& .emoji-mart-scroll': {
            height: '240px'
        },
        '& .emoji-mart-emoji': {
            outline: 'none',
            '& span': {
                cursor: 'pointer !important'
            },
            '&:hover:before': {
                backgroundColor: 'unset !important'
            }
        },
    },
    arrow: {
        color: theme.palette.common.white,
    },
}))(Tooltip)