import { Box } from '@mui/material';
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import SalesDashBoard from '../../features/sales/SalesDashBoard';
import ToolBarButtons from './ToolBarButtons';
import { Outlet } from 'react-router-dom';




const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<string>(""); // Estado para la vista actual

  const handleButtonClick = (label: string) => {
    setCurrentView(label); // Actualiza la vista actual según el botón
  };

 /*  const renderContent = () => {
    switch (currentView) {
      case "F1 Ventas":
        return <div>Sales Component</div>;
      // Agrega aquí los demás componentes para cada botón según sea necesario
      case "F2 Clientes":
        return <div>Clientes Component</div>;
      case "F3 Productos":
        return <div>Productos Component</div>;
      // Añade otros casos para los demás botones
      default:
        return <div>Selecciona una opción</div>;
    }
  }; */
  return (
       <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "97vh", // Aseguramos que ocupe el 100% de la ventana
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Header: 10% de la altura */}
      <Box sx={{ flex: '0 0 10%' }}>
        <Header />
      </Box>

      {/* Toolbar Buttons: 10% de la altura */}
      <Box sx={{ flex: '0 0 10%' }}>
        <ToolBarButtons onButtonClick={handleButtonClick} />
      </Box>

      {/* Contenido dinámico: 70% de la altura */}
      <Box
        component="main"
        sx={{
          flex: '0 0 70%',
          overflow: "auto", // Permite scroll si el contenido excede
        }}
      >
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </Box>

      {/* Footer: 10% de la altura */}
      <Box sx={{ flex: '0 0 10%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout