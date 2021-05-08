import {createMuiTheme} from '@material-ui/core'
import montserrat from './utils/helpers/fontHelper'

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Montserrat, Open Sans Condensed, Arial',

    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [montserrat]
            }
        }
    }
})

export default theme
