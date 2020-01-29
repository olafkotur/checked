import { createMuiTheme } from '@material-ui/core/styles';

export const LightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#FF9E00',
            light: '#FFB718',
            dark: '#DF7E00',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffffff'
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
    },
    typography: {
        button: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'none'
        },
    },
    overrides: {
        MuiCardHeader: {
            title: {
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.1em',
                fontSize: '140%',
            },
            avatar: {
                marginLeft: '10px',
                width: '30px',
                height: '30px',
            }
        },
        MuiTabs: {
            indicator: {
                height: '99%',
                top: 0,
                zIndex: 0,
                backgroundColor: '#ff9e00'
            }
        },
        MuiTab: {
            root: {
                backgroundColor: 'transparent',
                border: '#FF9E00',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderTopWidth: '2px',
                borderBottomWidth: '2px',
                borderStyle: 'solid',
                '&active': {
                    backgroundColor: '#000000'
                },
                zIndex: 100,
                outline: 'none !important'
            },
            textColorInherit: {
                fontWeight: 700,
                letterSpacing: '3px',
                fontSize: '97.5%',
                opacity: 0.95
            },
            wrapper: {
                flexDirection: 'row',
                justifyContent: 'center'
            }
        },
    }
});

export const DarkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#EF8E00',
            light: '#FFB718',
            dark: '#DF7E00',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffffff'
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
    },
    typography: {
        button: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'none'
        },
    },
    overrides: {
        MuiCardHeader: {
            title: {
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.1em',
                fontSize: '140%',
            },
            avatar: {
                marginLeft: '10px',
                width: '30px',
                height: '30px',
            }
        },
        MuiTabs: {
            indicator: {
                height: '99%',
                top: 0,
                zIndex: 0,
                backgroundColor: '#DF7E00',
            },
        },
        MuiTab: {
            root: {
                backgroundColor: 'transparent',
                border: '#DF7E00',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderTopWidth: '2px',
                borderBottomWidth: '2px',
                borderStyle: 'solid',
                zIndex: 100,
                outline: 'none !important',
            },
            textColorInherit: {
                fontWeight: 700,
                letterSpacing: '3px',
                fontSize: '97.5% !important',
                opacity: 0.95,
            },
            wrapper: {
                flexDirection: 'row',
                justifyContent: 'center'
            }
        },
    }
});
