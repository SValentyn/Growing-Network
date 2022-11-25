export const throttlingWrapper = (func, delay) => {
    let isRequestSent = false
    let savedParams
    let savedThis

    function wrapper () {
        if (isRequestSent) {
            savedParams = arguments
            savedThis = this
            return
        }

        func.apply(this, arguments)

        isRequestSent = true

        setTimeout(function () {
            isRequestSent = false
            if (savedParams) {
                wrapper.apply(savedThis, savedParams)
                savedParams = savedThis = null
            }
        }, delay)
    }

    return wrapper
}
