// src\renderer\layouts\ProductLayout\ProductMainLayout.tsx
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
import { FaRegStar } from "react-icons/fa6";
import { FcImport } from "react-icons/fc";

function ProductMainLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  // Define las pestañas con sus rutas
  const tabs = [
    { label: 'Listado de Productos', path: '/productos/lista',icon:<BsReverseListColumnsReverse/> },
    { label: 'Agregar Producto', path: '/productos/agregar',icon:<IoIosAddCircle/> },
    { label: 'Modificar Producto', path: '/productos/modificar',icon:<MdEdit/> },
/*     { label: 'Eliminar Producto', path: '/productos/eliminar' },
    { label: 'Configuraciones', path: '/productos/configuraciones' }, */
    { label: 'Reportes', path: '/productos/reportes',icon:<BiSolidReport/> },
    { label: 'Departamentos', path: '/productos/departamentos',icon:<FcDepartment/> },
/*     { label: 'Ventas por Periodo', path: '/productos/ventasperiodo' }, */
    { label: 'Promociones', path: '/productos/promociones',icon:<FaRegStar/> },
    { label: 'Importar', path: '/productos/importar',icon:<FcDepartment/> },
/*     { label: 'Catalogo', path: '/productos/catalogo' }, */
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
        <Tab sx={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'none' }} key={index} label={tab.label} icon={tab.icon} />
      ))}
    </Tabs>

    {/* Renderiza el contenido de la subruta */}
    <Box sx={{ marginTop: 2}}>
      <Outlet />
    </Box>
  </Box>
  )
}

export default ProductMainLayout