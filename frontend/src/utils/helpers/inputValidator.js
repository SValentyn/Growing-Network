export const areNoErrors = errorsObj => {
    return Object.values(errorsObj).every(err => err === '')
}

export const validatePassword = password => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long'
    }
    return ''
}

export const checkPasswordsMatch = (password1, password2) => {
    if (password1 !== password2) {
        return 'Passwords don\'t match'
    }
    return ''
}

export const validateEmail = email => {
    if (!email.match(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)) {
        return 'Incorrect email address'
    }
    return ''
}

export const validateUsername = username => {
    if (username.length < 6) {
        return 'Username must be at least 6 characters long'
    }
    return ''
}
