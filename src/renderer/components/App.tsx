import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../theme";

import ToolBarButtons from "./ToolBarButtons";
import PrincipalBanner from "./PrincipalBanner";
import SearchBarProducts from "./SearchBarProducts";
import PrincipalTable from "./PrincipalTable";

// Define the types for the rows in the table
export interface ProductRow {
  id: number;
  'Código de Barras': string;
  'Descripción del Producto': string;
  'Precio Venta': number;
  'Cant.': number;
  'Importe': number;
  'Existencia': number;
}

export default function App(): JSX.Element {

  const rows: ProductRow[] = [
    { id: 1, 'Código de Barras': '7501000134594', 'Descripción del Producto': 'Coca-Cola 600ml', 'Precio Venta': 15, 'Cant.': 2, 'Importe': 30, 'Existencia': 50 },
    { id: 2, 'Código de Barras': '7501031311309', 'Descripción del Producto': 'Sabritas Original 45g', 'Precio Venta': 13, 'Cant.': 1, 'Importe': 13, 'Existencia': 35 },
    { id: 3, 'Código de Barras': '7506211101626', 'Descripción del Producto': 'Galletas Oreo 100g', 'Precio Venta': 18, 'Cant.': 4, 'Importe': 72, 'Existencia': 25 },
    { id: 4, 'Código de Barras': '7501026005909', 'Descripción del Producto': 'Lays Papas 145g', 'Precio Venta': 40, 'Cant.': 2, 'Importe': 80, 'Existencia': 15 },
    { id: 5, 'Código de Barras': '7501004117029', 'Descripción del Producto': 'Pepsi 1.5L', 'Precio Venta': 25, 'Cant.': 3, 'Importe': 75, 'Existencia': 30 },
    { id: 6, 'Código de Barras': '7501075100068', 'Descripción del Producto': 'Agua Ciel 1L', 'Precio Venta': 12, 'Cant.': 5, 'Importe': 60, 'Existencia': 45 },
    { id: 7, 'Código de Barras': '7501099993463', 'Descripción del Producto': 'Chocolate Carlos V 18g', 'Precio Venta': 10, 'Cant.': 10, 'Importe': 100, 'Existencia': 100 },
    { id: 8, 'Código de Barras': '7502225328096', 'Descripción del Producto': 'Jugos del Valle 1L', 'Precio Venta': 20, 'Cant.': 2, 'Importe': 40, 'Existencia': 20 },
    { id: 9, 'Código de Barras': '7506142800136', 'Descripción del Producto': 'Leche Lala 1L', 'Precio Venta': 22, 'Cant.': 6, 'Importe': 132, 'Existencia': 60 },
  ];
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          {/* This is where your app content should go */}
          <ToolBarButtons/>
          <PrincipalBanner/>
          <SearchBarProducts/>
          <ToolBarButtons/>
          <PrincipalTable productosTicket={rows}/>
        </main>
      </Box>
    </ThemeProvider>
  );
}
