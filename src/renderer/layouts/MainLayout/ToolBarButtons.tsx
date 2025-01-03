import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { MdSell, MdPeople, MdInventory, MdSettings, MdReceipt, MdReport, MdExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate

interface ToolBarButtonsProps {
  onButtonClick: (label: string) => void; // Propiedad para manejar el clic
}

const ToolBarButtons: React.FC<ToolBarButtonsProps> = ({ onButtonClick }) => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación
  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    setActiveButton(label);  // Marca el botón como activo
    onButtonClick(label);  // Llama a la función de clic del padre
    navigate(getRouteForLabel(label)); // Navega a la ruta correspondiente
  };

  // Mapeo de botones a rutas
  const getRouteForLabel = (label: string): string => {
    switch (label) {
      case 'F1 Ventas':
        return '/ventas';
      case 'F2 Clientes':
        return '/clientes';
      case 'F3 Productos':
        return '/productos';
      case 'F4 Inventarios':
        return '/inventarios';
      case 'Configuración':
        return '/configuracion';
      case 'Facturas':
        return '/facturas';
      case 'Corte':
        return '/corte';
      case 'Reportes':
        return '/reportes';
      case 'Salir':
        return '/salir'; // Si deseas agregar una ruta para "Salir"
      default:
        return '/';
    }
  };

  // Lista de los botones
  const BotonesBarraHerramientas = [
    "F1 Ventas",
    "F2 Clientes",
    "F3 Productos",
    "F4 Inventarios",
    "Configuración",
    "Facturas",
    "Corte",
    "Reportes",
    "Salir",
  ];

  // Array de íconos correspondientes
  const IconosBotonesBarraHerramienta = [
    MdSell,      // Icono para Ventas
    MdPeople,    // Icono para Clientes
    MdInventory, // Icono para Productos
    MdInventory, // Icono para Inventarios
    MdSettings,  // Icono para Configuración
    MdReceipt,   // Icono para Facturas
    MdReceipt,   // Icono para Corte
    MdReport,    // Icono para Reportes
    MdExitToApp, // Icono para Salir
  ];

  // Mapeo de teclas a botones
  const keyToButtonMap: { [key: string]: string } = {
    F1: "F1 Ventas",
    F2: "F2 Clientes",
    F3: "F3 Productos",
    F4: "F4 Inventarios",
  };

  React.useEffect(() => {
    // Función para manejar el evento de teclado
    const handleKeyDown = (event: KeyboardEvent) => {
      const buttonLabel = keyToButtonMap[event.key];
      if (buttonLabel) {
        handleButtonClick(buttonLabel); // Llama a handleButtonClick si se presiona una tecla asignada
      }
    };

    // Agregar el evento global de teclado
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Stack
      direction="row"
      spacing={1} // Espacio entre botones
      sx={{
     
        p: 2,
        overflow: 'auto', // Permitir desplazamiento si hay demasiados botones
        width: '100%', // Asegura que el contenedor ocupe todo el ancho
      }}
    >
      {BotonesBarraHerramientas.map((label, index) => {
        const Icono = IconosBotonesBarraHerramienta[index]; // Obtén el ícono correspondiente

        return (
          <Button
            key={index}
            fullWidth
            variant="outlined"
            startIcon={<Icono />} // Usa el ícono correspondiente
            onClick={() => handleButtonClick(label)} // Llama a handleButtonClick con el label del botón
            sx={{
              flexGrow: 1, // Asegura que los botones ocupen el ancho disponible
              minWidth: 100, // Ancho mínimo para cada botón
              height: 40, // Alto fijo para los botones
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, // Tamaño de fuente adaptable
              px: 2, // Padding interno para un buen ajuste
              aspectRatio: '3 / 1', // Relación de aspecto de 3:1
              backgroundColor: activeButton === label ? 'primary.main' : 'inherit',
              color: activeButton === label ? 'white' : 'primary.main',
              '&:hover': {
                backgroundColor: activeButton === label ? 'primary.main' : 'primary.light',
                color: activeButton === label ? 'primary.main' : 'white',
              },
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>
              {label}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
};

export default ToolBarButtons;
