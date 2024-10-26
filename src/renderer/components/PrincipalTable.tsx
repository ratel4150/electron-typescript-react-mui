import { styled } from '@mui/material/styles';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ProductRow } from './App';
import React from 'react'
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>No hay productos</Box>
    </StyledGridOverlay>
  );
}

interface PrincipalTableProps {
  productosTicket: ProductRow[];
}


 /*  
  const rows = [
    { id: 1, 'Código de Barras': '7501000134594', 'Descripción del Producto': 'Coca-Cola 600ml', 'Precio Venta': 15, 'Cant.': 2, 'Importe': 30, 'Existencia': 50 },
    { id: 2, 'Código de Barras': '7501031311309', 'Descripción del Producto': 'Sabritas Original 45g', 'Precio Venta': 13, 'Cant.': 1, 'Importe': 13, 'Existencia': 35 },
    { id: 3, 'Código de Barras': '7506211101626', 'Descripción del Producto': 'Galletas Oreo 100g', 'Precio Venta': 18, 'Cant.': 4, 'Importe': 72, 'Existencia': 25 },
    { id: 4, 'Código de Barras': '7501026005909', 'Descripción del Producto': 'Lays Papas 145g', 'Precio Venta': 40, 'Cant.': 2, 'Importe': 80, 'Existencia': 15 },
    { id: 5, 'Código de Barras': '7501004117029', 'Descripción del Producto': 'Pepsi 1.5L', 'Precio Venta': 25, 'Cant.': 3, 'Importe': 75, 'Existencia': 30 },
    { id: 6, 'Código de Barras': '7501075100068', 'Descripción del Producto': 'Agua Ciel 1L', 'Precio Venta': 12, 'Cant.': 5, 'Importe': 60, 'Existencia': 45 },
    { id: 7, 'Código de Barras': '7501099993463', 'Descripción del Producto': 'Chocolate Carlos V 18g', 'Precio Venta': 10, 'Cant.': 10, 'Importe': 100, 'Existencia': 100 },
    { id: 8, 'Código de Barras': '7502225328096', 'Descripción del Producto': 'Jugos del Valle 1L', 'Precio Venta': 20, 'Cant.': 2, 'Importe': 40, 'Existencia': 20 },
    { id: 9, 'Código de Barras': '7506142800136', 'Descripción del Producto': 'Leche Lala 1L', 'Precio Venta': 22, 'Cant.': 6, 'Importe': 132, 'Existencia': 60 },
  ]; */

 

  const PrincipalTable: React.FC<PrincipalTableProps> = ({ productosTicket }) => {
    const columns: GridColDef<(typeof productosTicket)[number]>[] = [
      {
        field: 'Código de Barras',
        headerName: 'Código de Barras',
        editable: true,
        flex: 1, // Ajusta el tamaño dinámicamente según el espacio disponible
        // Aquí aplicamos estilos personalizados
        renderCell: (params) => (
          <Box
            sx={{
              backgroundColor: '#E0F7FA', // Azul claro
              color: '#01579B', // Azul oscuro
              padding: '8px',
              borderRadius: '4px',
              width: '100%',
              textAlign: 'right', // Alinear texto a la derecha
            }}
          >
            {params.value}
          </Box>
        ),
      },
      {
        field: 'Descripción del Producto',
        headerName: 'Descripción del Producto',
        editable: true,
        flex: 2, // Esta columna ocupa el doble del espacio que 'Código de Barras'
      },
      {
        field: 'Precio Venta',
        headerName: 'Precio Venta',
        type: 'number',
        editable: true,
        flex: 1,
        
      },
      {
        field: 'Cant.',
        headerName: 'Cant.',
        type: 'number',
        editable: true,
        flex: 1,
      },
      {
        field: 'Importe',
        headerName: 'Importe',
        type: 'number',
        editable: true,
        flex: 1,
        // Aquí aplicamos estilos personalizados
        renderCell: (params) => (
          <Box
            sx={{
              backgroundColor: '#ccffcc', // Verde claro
              color: '#006400', // Verde oscuro
              padding: '8px',
              borderRadius: '4px',
              width: '100%',
              textAlign: 'right',
            }}
          >
            {params.value}
          </Box>
        ),
      },
      {
        field: 'Existencia',
        headerName: 'Existencia',
        type: 'number',
        editable: true,
        flex: 1,
      },
    ];
  return (
    <Box sx={{ height: 450, width: '100%',p:1 }}>
      <DataGrid
      density='compact'
      sx={{ '&, [class^=MuiDataGrid]': { border: 'none','--DataGrid-overlayHeight': '300px'  } }}/* Elimina las lineas de separaciond e la tabla  */
        rows={productosTicket}
        columns={columns}
       
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      
        disableRowSelectionOnClick
        
      />
    </Box>
  )
}

export default PrincipalTable