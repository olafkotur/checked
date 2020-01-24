import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF9E00',
            light: '#FFB718',
            dark: '#DF7E00',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800'
        },
        success: {
            main: '#4caf50'
        },
        info: {
            main: '#2196f3'
        }
    }
});

export default theme;