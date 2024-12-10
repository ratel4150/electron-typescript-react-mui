// src\renderer\features\inventory\pages\InventoryIndex.tsx
import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { PiStackOverflowLogoDuotone } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";

const InventoryMainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define las pestañas con sus rutas
  const tabs = [
    { label: "Agregar", path: "/inventarios/agregar" },
    { label: "Ajustes", path: "/inventarios/ajustes" },
    { label: "Productos Bajos", path: "/inventarios/productos-bajos" },
    { label: "Reporte Inventario", path: "/inventarios/reporte-inventario" },
    { label: "Reporte Movimientos", path: "/inventarios/reporte-movimientos" },
    { label: "Kardex", path: "/inventarios/kardex" },
  ];

  // Encuentra el índice de la pestaña activa o asigna un valor predeterminado
  const currentTab = tabs.findIndex((tab) => location.pathname.startsWith(tab.path));
  const validTab = currentTab >= 0 ? currentTab : 0; // Fallback a la primera pestaña

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Navegación por pestañas */}
      <Tabs
        value={validTab} // Usa el valor válido
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab sx={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'none' }} key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Renderiza el contenido de la subruta */}
      <Box sx={{ marginTop: 2}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default InventoryMainLayout;
