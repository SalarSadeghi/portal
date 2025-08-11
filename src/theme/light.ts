// import Accordion from '@theme/overrides/Accordion.tsx';
// import Container from '@theme/overrides/Container.tsx';
// import Tooltip from '@theme/overrides/Tooltip.tsx';
// import Autocomplete from '@theme/overrides/Autocomplete.tsx';

import { Container, createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  direction: "rtl",
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#13678a",
    },
    secondary: {
      main: "#0C599E",
    },
    text: {
      primary: "#6B6B6B",
    },
    grey: {
      50: "#E1E1E1",
      100: "#afafaf",
    },
  },

  typography: {
    allVariants: {
      color: "#6B6B6B",
      fontFamily: "inherit",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {
          fontFamily: "inherit",
        },
      },
    },
  },
};

const lightTheme = createTheme(themeOptions);
lightTheme.components = {
    // ...Container(),
    // ...Accordion(lightTheme),
    // ...Tooltip(),
    // ...Autocomplete(lightTheme)

};

export default lightTheme;
