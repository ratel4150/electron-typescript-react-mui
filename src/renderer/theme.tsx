import { createTheme } from "@mui/material/styles";

// Create a Material-UI theme instance
// https://mui.com/customization/theming/
const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Un verde vibrante para resaltar botones principales
      contrastText: "#FFFFFF", // Texto blanco para contrastar en los botones primarios
    },
    secondary: {
      main: "#FF9800", // Un naranja cálido para los botones secundarios
      contrastText: "#FFFFFF", // Texto blanco para contrastar en los botones secundarios
    },
    background: {
      default: "#FFFFFF", // Fondo blanco limpio
    },
    text: {
      primary: "#333333", // Texto principal en gris oscuro para buena legibilidad
      secondary: "#555555", // Texto secundario en gris medio
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 600,
    fontSize: 16, // Fuente ligeramente más grande para mejorar la lectura
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#4CAF50", // Verde primario para los títulos
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#333333", // Títulos en gris oscuro para buen contraste
    },
    body1: {
      fontSize: "1rem",
      color: "#555555", // Texto del cuerpo en gris medio
    },
    button: {
      fontWeight: 700, // Botones en negrita para mayor énfasis
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Botones redondeados para un aspecto moderno
          padding: "10px 20px", // Tamaño cómodo para tocar
          textTransform: "none", // Evitar que los botones conviertan el texto a mayúsculas
        },
        containedPrimary: {
          backgroundColor: "#4CAF50",
          "&:hover": {
            backgroundColor: "#388E3C", // Un verde más oscuro para el hover
          },
        },
        containedSecondary: {
          backgroundColor: "#FF9800",
          "&:hover": {
            backgroundColor: "#F57C00", // Un naranja más oscuro para el hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Tarjetas con bordes más suaves
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Sombra suave para las tarjetas
          padding: "16px", // Espaciado interno cómodo
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px", // Espaciado en las celdas de la tabla
          borderBottom: "1px solid #E0E0E0", // Líneas de separación suaves en las tablas
        },
        head: {
          fontWeight: 700,
          backgroundColor: "#F5F5F5", // Encabezados de tabla con un fondo ligeramente gris
        },
      },
    },
  },
});

export default theme;
