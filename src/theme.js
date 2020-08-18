import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002347",
    },
    secondary: {
      main: "#EBFBFF",
      dark: "#00A5CF",
    },
    accent: {
      main: "#7AE582",
    },
    action: {
      active: "#002347",
      disabled: "#EBFBFF",
    },
  },
  shape: {
    borderRadius: "5px",
  },
});
export default theme;
