import { Box } from '@mui/material';
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import SalesDashBoard from '../../modules/sales/SalesDashBoard';
import ToolBarButtons from './ToolBarButtons';




const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<string>(""); // Estado para la vista actual

  const handleButtonClick = (label: string) => {
    setCurrentView(label); // Actualiza la vista actual según el botón
  };

  const renderContent = () => {
    switch (currentView) {
      case "F1 Ventas":
        return <SalesDashBoard />;
      // Agrega aquí los demás componentes para cada botón según sea necesario
      case "F2 Clientes":
        return <div>Clientes Component</div>;
      case "F3 Productos":
        return <div>Productos Component</div>;
      // Añade otros casos para los demás botones
      default:
        return <div>Selecciona una opción</div>;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Header siempre visible */}
      <Header />
       <ToolBarButtons   onButtonClick={handleButtonClick} />
      {/* Contenido dinámico */}
      <Box
        component="main"
        sx={{
          flex: 1,
        
        }}
      >
       {renderContent()} {/* Renderiza el contenido según el botón presionado */}
      </Box>

      {/* Footer siempre visible */}
      <Footer />
    </Box>
  );
};

export default MainLayout