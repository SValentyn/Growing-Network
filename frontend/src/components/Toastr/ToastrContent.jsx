import React, {useState} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

import {useStyles} from './toastrStyles'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
}

function MySnackbarContentWrapper(props) {
    const classes = useStyles()
    const {className, message, onClose, variant, ...other} = props
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={classnames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classnames(classes.icon, classes.iconVariant)}/>
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>
            ]}
            {...other}
        />
    )
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
}

export default function ToastrContent(props) {
    const {message, variant = 'info'} = props
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    variant={variant}
                    className={classes.margin}
                    message={message}
                    onClose={handleClose}
                />
            </Snackbar>
        </div>
    )
}

ToastrContent.propTypes = {
    message: PropTypes.string,
    variant: PropTypes.string
}
