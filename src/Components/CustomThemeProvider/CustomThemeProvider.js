import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
/* We use this to create a custom theme for our app.
We can customize the theme by changing the values of the properties in the object passed to createTheme. */

const defaultTheme = createTheme({
  typography: {
    button: { textTransform: "none", fontSize: "1rem", fontWeight: "bold" },
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontSize: "1.875rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontSize: "0.75rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            padding: 12,
          },
          div: {
            height: 40,
            backgroundColor: "#fff",
          },
          "& .MuiFormLabel-root": {
            top: -8,
          },
          "& .Mui-focused": {
            top: 0,
          },
          "& .MuiFormLabel-filled": {
            top: 0,
          },
        },
      },
    },
  },
});

export const CustomThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={defaultTheme}>{children}</MuiThemeProvider>;
};
