import { blue, green, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[300],
        },
        secondary: {
            main: green[300],
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
