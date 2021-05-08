import React from 'react'
import {toastr} from 'react-redux-toastr'
import ToastrContent from '../../components/Toastr/ToastrContent'

export const serverError = 'An error occurred while trying to access the server. Please try again later.'

const toastrDefaultOptions = {
    timeOut: 3200,
    position: 'bottom-right',
    transitionIn: 'fadeIn',
    removeOnHover: true
}

const showToastr = (params) => {
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
    success: (message) => {
        showToastr({message, variant: 'success'})
    },

    error: (message = serverError) => {
        showToastr({message, variant: 'error'})
    },

    warning: (message) => {
        showToastr({message, variant: 'warning'})
    },

    info: (message) => {
        showToastr({message, variant: 'info'})
    }
}
