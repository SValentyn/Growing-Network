import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './Toastr.scss'

const Toastr = () => (
    <ReduxToastr timeOut={3000}
                 preventDuplicates
                 position="bottom-right"
                 transitionIn="fadeIn"
                 transitionOut="fadeOut"
    />
)

export default Toastr
