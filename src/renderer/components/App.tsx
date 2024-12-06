// src\renderer\components\App.tsx
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../theme";


import MainLayout from "../layouts/MainLayout/MainLayout";
import SignIn from "../layouts/MainLayout/SignIn";
import { Route, Routes } from "react-router-dom";
import SalesDashBoard from "../features/sales/SalesDashBoard";
import InventoryMainLayout from "../layouts/InventoryLayout/InventoryMainLayout";
import AddProduct from "../features/inventory/pages/AddProduct";
import InventorySettings from "../features/inventory/pages/InventorySettings";
import LowInventory from "../features/inventory/pages/LowInventory";
import MovementReport from "../features/inventory/pages/MovementReport";

import InventoryReport from "../features/inventory/pages/InventoryReport";
import Kardex from "../features/inventory/pages/Kardex";
import ProductMainLayout from "../layouts/ProductLayout/ProductMainLayout";
import AddProductPage from "../features/product/pages/AddProductPage";
import ProductSettingsPage from "../features/product/pages/ProductSettingsPage";
import ProductReportPage from "../features/product/pages/ProductReportPage";
import ProductListPage from "../features/product/pages/ProductListPage";
import DepartmentPage from "../features/product/pages/DepartmentPage";
import SalesPerPeriodPage from "../features/product/pages/SalesPerPeriodPage";
import PromotionsPage from "../features/product/pages/PromotionsPage";
import ImportProductsPage from "../features/product/pages/ImportProductsPage";
import CatalogPage from "../features/product/pages/CatalogPage";
import UpdateProductPage from "../features/product/pages/UpdateProductPage";
import DeleteProductPage from "../features/product/pages/DeleteProductPage";



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


  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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
      {/*  <Routes>
      <Route
        path="/"
        element={
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <main>
              {isAuthenticated ? (
                <MainLayout />
              ) : (
                <SignIn onSignIn={() => setIsAuthenticated(true)} />
              )}
            </main>
          </Box>
        }
      />
    </Routes> */}
      <Routes>
        {/* Ruta principal que utiliza MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route
            path="ventas"
            element={
              <div>
                <h1>Ventas</h1>
                <p>Este es el componente de Ventas.</p>
              </div>
            }
          />
          <Route
            path="clientes"
            element={
              <div>
                <h1>Clientes</h1>
                <p>Este es el componente de Clientes.</p>
              </div>
            }
          />
          <Route
            path="productos"
            element={
              <ProductMainLayout />
            }
          >    <Route path="lista" element={<ProductListPage />} />
            <Route path="agregar" element={<AddProductPage />} />
            <Route path="modificar" element={<UpdateProductPage />} />
            <Route path="eliminar" element={<DeleteProductPage />} />
            <Route path="configuraciones" element={<ProductSettingsPage />} />
            <Route path="reportes" element={<ProductReportPage />} />
            <Route path="departamentos" element={<DepartmentPage />} />
         {/*    <Route path="ventasperiodo" element={<SalesPerPeriodPage />} /> */}
            <Route path="promociones" element={<PromotionsPage />} />
            <Route path="importar" element={<ImportProductsPage />} />
            <Route path="catalogo" element={<CatalogPage />} />
            {/*  <Route path="agregar" element={<AddProductPage />} /> */}

          </Route>
          <Route
            path="inventarios"
            element={
              <InventoryMainLayout />
            }
          >
            <Route path="agregar" element={<AddProduct />} />
            <Route path="ajustes" element={<InventorySettings />} />

            <Route path="productos-bajos" element={<LowInventory />} />
            <Route path="reporte-inventario" element={<InventoryReport />} />
            <Route path="reporte-movimientos" element={<MovementReport />} />
            <Route path="kardex" element={<Kardex />} />
          </Route>
          <Route
            path="configuracion"
            element={
              <div>
                <h1>Configuración</h1>
                <p>Este es el componente de Configuración.</p>
              </div>
            }
          />
          <Route
            path="facturas"
            element={
              <div>
                <h1>Facturas</h1>
                <p>Este es el componente de Facturas.</p>
              </div>
            }
          />
          <Route
            path="corte"
            element={
              <div>
                <h1>Corte</h1>
                <p>Este es el componente de Corte.</p>
              </div>
            }
          />
          <Route
            path="reportes"
            element={
              <div>
                <h1>Reportes</h1>
                <p>Este es el componente de Reportes.</p>
              </div>
            }
          />
          <Route
            path="salir"
            element={
              <div>
                <h1>Salir</h1>
                <p>Has salido de la aplicación.</p>
              </div>
            }
          />
          {/* Agrega otras rutas aquí */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
