// src\renderer\features\inventory\components\InventoryDataGrid.tsx
import { Alert, Box, Chip, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
const inventoryData = [
    {
      id: 1,
      product: "Laptop Pro 15",
      sku: "LP15-001",
      warehouse: "Main Warehouse",
      quantity: 50,
      reservedQuantity: 10,
      availableQuantity: 40,
      status: "IN_STOCK",
      expiryDate: "2025-12-31",
    },
    {
      id: 2,
      product: "Wireless Mouse",
      sku: "WM-004",
      warehouse: "Secondary Warehouse",
      quantity: 5,
      reservedQuantity: 2,
      availableQuantity: 3,
      status: "LOW_STOCK",
      expiryDate: "2024-06-01",
    },
    // Más datos simulados...
  ];
const InventoryDataGrid = () => {

    const [rows, setRows] = React.useState(inventoryData);
  const [filter, setFilter] = React.useState("");
  const [alert, setAlert] = React.useState(null);


  const handleSearch = (event: { target: { value: string; }; }) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredRows = rows.filter(
    (row) =>
      row.product.toLowerCase().includes(filter) ||
      row.sku.toLowerCase().includes(filter) ||
      row.warehouse.toLowerCase().includes(filter)
  );

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
/*     setAlert({ type: "success", message: "Producto eliminado correctamente." }); */
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "product", headerName: "Producto", width: 200 },
    { field: "sku", headerName: "SKU", width: 150 },
    { field: "warehouse", headerName: "Almacén", width: 200 },
    {
      field: "quantity",
      headerName: "Cantidad Total",
      width: 150,
      type: "number",
    },
    {
      field: "availableQuantity",
      headerName: "Cantidad Disponible",
      width: 180,
      type: "number",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params:any) => (
        <Box sx={{display:'flex',alignItems:"center"}}>
        <Chip size='small'
          label={params.value}
          color={
            params.value === "IN_STOCK"
              ? "success"
              : params.value === "LOW_STOCK"
              ? "warning"
              : "error"
          }
        /></Box>
      ),
    },
    {
      field: "expiryDate",
      headerName: "Fecha de Vencimiento",
      width: 200,
      renderCell: (params:any) => (
        <Typography
          color={
            new Date(params.value) < new Date() ? "error.main" : "text.primary"
          }
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      renderCell: (params:any) => (
        <>
        
        <IconButton color="info">
            info
          </IconButton>
          <IconButton color="primary">
         edit
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
           delete
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h4">Gestión de Inventario</Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Buscar por nombre, SKU o almacén"
       /*  InputProps={{
          startAdornment: <Search />,
        }} */
        onChange={handleSearch}
      />
    </Box>
    <DataGrid
      rows={filteredRows}
      columns={columns}
      
    


      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'primary.light',
          color: 'gray',
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'action.hover',
        },
        '& .MuiDataGrid-cell': {
          fontSize: '0.8rem',
        },
      }}
  
    />
 {/*    {alert && (
      <Snackbar
        open={true}
        autoHideDuration={3000}
        onClose={() => setAlert(null)}
      >
        <Alert
          onClose={() => setAlert(null)}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    )} */}
  </Box>
  )
}

export default InventoryDataGrid 