import { createTheme } from '@mui/material/styles'
import { Color, PaletteMode } from '@mui/material'

//override necessary to add custom colors (with custom name) to pallete
// in a way accaptable to typescript
declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    default: string
    paper: string
    dark: string
    light: string
    black: string
  }

  export interface TypeChart {
    stroke: string
    fill: string
    background: string
  }

  export interface TypeAlert {
    long: {
      secondaryText: string
      background: string
      shadow: string
    }
    short: {
      secondaryText: string
      background: string
      shadow: string
    }
  }

  export interface Palette {
    common: CommonColors
    mode: PaletteMode
    contrastThreshold: number
    tonalOffset: PaletteTonalOffset
    primary: PaletteColor
    secondary: PaletteColor
    error: PaletteColor
    warning: PaletteColor
    info: PaletteColor
    success: PaletteColor
    grey: Color
    text: TypeText
    divider: TypeDivider
    action: TypeAction
    background: TypeBackground
    chart: TypeChart
    alert: TypeAlert
    getContrastText: (background: string) => string
    augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor
  }
  export interface PaletteOptions {
    primary?: PaletteColorOptions
    secondary?: PaletteColorOptions
    error?: PaletteColorOptions
    warning?: PaletteColorOptions
    info?: PaletteColorOptions
    success?: PaletteColorOptions
    mode?: PaletteMode
    tonalOffset?: PaletteTonalOffset
    contrastThreshold?: number
    common?: Partial<CommonColors>
    grey?: ColorPartial
    text?: Partial<TypeText>
    divider?: string
    action?: Partial<TypeAction>
    background?: Partial<TypeBackground>
    chart?: Partial<TypeChart>
    alert?: Partial<TypeAlert>
    getContrastText?: (background: string) => string
  }
}
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 925,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#F3504F',
      light: 'rgba(255,255,255,90%)',
      dark: '#595F70',
    },
    chart: {
      stroke: '#2D52A1',
      fill: '#F35C5C',
      background: '#093DAC',
    },
    alert: {
      long: {
        secondaryText: '#00ff84',
        background: '#008c44',
        shadow: 'rgb(23,100,90)',
      },
      short: {
        secondaryText: '#F29b9b',
        background: '#f05253',
        shadow: 'rgb(125,70,92)',
      },
    },
    secondary: {
      main: '#F64E4A',
    },
    error: {
      main: '#F73737',
    },
    background: {
      default: '#0042CD',
      dark: '#0034A4',
      paper: '#FFFFFF',
      light: 'rgba(255,255,255,20%)',
      black: '#000',
    },
    text: {
      primary: '#FFFFFF',
    },
    success: {
      main: '#419865',
      light: '#9CC5AD',
    },
    grey: {
      200: 'rgba(255, 255, 255, 0.5)',
      50: '#909FB4',
      400: '#dcdcdc',
      500: '#353941',
      600: '#979797',
      700: 'dimgray',
      900: 'rgb(0, 0, 0, 0.2)',
    },
    divider: '#96B6FF',
  },
  typography: {
    fontFamily: ['Cairo'].join(', '),
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          borderWidth: 4,
          borderStyle: 'solid',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.4);',
          '&:hover': {
            boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.4);',
          },
        },
        contained: {
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        outlined: {
          backgroundColor: '#fff',
          borderStyle: 'solid',
          '&:hover': {
            //backgroundColor: 'magenta', //todo: discuss what color should we apply here
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ADB6BC',
          '&.Mui-selected': { color: '#fff', background: '#0042CD', '&.Mui-focusVisible': { background: '#0042CD' } },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        action: {
          flexShrink: 0,
        },
      },
    },
  },
})

export const liteTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 925,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#F3504F',
      light: 'rgba(255,255,255,90%)',
      dark: '#595F70',
    },
    secondary: {
      main: '#419865',
    },
    error: {
      main: '#F73737',
    },
    background: {
      default: 'rgb(54,53,56)', //'#0042CD',
      dark: '#909FB4', //'#0034A4',
      paper: '#FFFFFF',
      light: 'rgba(255,255,255,40%)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgb(201,200,198)',
      disabled: 'rgb(135,134,133)',
    },
    success: {
      main: 'rgb(54,53,56)',
      light: '#9CC5AD',
    },
    grey: {
      200: 'rgba(255, 255, 255, 0.5)',
      50: '#909FB4',
      400: '#272527',
      500: '#353941',
      600: '#979797',
      900: 'rgb(0, 0, 0, 0.2)',
    },
    divider: '#96B6FF',
  },
  typography: {
    fontFamily: ['Cairo'].join(', '),
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          borderWidth: 4,
          borderStyle: 'solid',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.4);',
          '&:hover': {
            boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.4);',
          },
        },
        contained: {
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        outlined: {
          backgroundColor: '#fff',
          borderStyle: 'solid',
          '&:hover': {
            //backgroundColor: 'magenta', //todo: discuss what color should we apply here
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ADB6BC',
          '&.Mui-selected': { color: '#fff', background: '#0042CD', '&.Mui-focusVisible': { background: '#0042CD' } },
        },
      },
    },
  },
})

// export const MuiThemeProvider: FC = ({ children }) => (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     {children}
//   </ThemeProvider>
// )
