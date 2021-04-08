import React from 'react'
import {toastr} from 'react-redux-toastr'
import ToastrContent from '../../components/Toastr/ToastrContent'

const toastrDefaultOptions = {
    timeOut: 3500,
    position: 'bottom-right',
    transitionIn: 'fadeIn',
    removeOnHover: true
}

const showToastr = params => {
    const {variant, message, toastrOptions = {}} = params
    toastr.message('', {
        ...toastrDefaultOptions,
        ...toastrOptions,
        component: (
            <ToastrContent message={message} variant={variant}/>
        )
    })
}

export const Toastr = {
    success: message => {
        showToastr({message, variant: 'success'})
    },

    error: (message = 'Something goes wrong! Please try again later') => {
        showToastr({
            message,
            variant: 'error'
        })
    },

    warning: message => {
        showToastr({message, variant: 'warning'})
    },

    info: message => {
        showToastr({message, variant: 'info'})
    }
}
