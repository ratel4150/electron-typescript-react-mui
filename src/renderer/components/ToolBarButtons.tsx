import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import { MdSell, MdPeople, MdInventory, MdSettings, MdReceipt, MdReport, MdExitToApp } from "react-icons/md";
function ToolBarButtons(): JSX.Element {
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
          sx={{
            flexGrow: 1, // Asegura que los botones ocupen el ancho disponible
            minWidth: 100, // Ancho mínimo para cada botón
            height: 40, // Alto fijo para los botones
            textTransform: 'none',
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, // Tamaño de fuente adaptable
            px: 2, // Padding interno para un buen ajuste
            aspectRatio: '3 / 1', // Relación de aspecto de 3:1
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: "0.8rem" }}>
            {label}
          </Typography>
        </Button>
      );
    })}
  </Stack>
  )
}

export default ToolBarButtons