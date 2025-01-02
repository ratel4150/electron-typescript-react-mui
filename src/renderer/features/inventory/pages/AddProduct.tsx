// src\renderer\features\inventory\pages\AddProduct.tsx
import React from "react";


import AddInventoryItemContainer from "../container/AddInventoryItemContainer";
import { Box, Typography } from "@mui/material";



function AddProduct() {

  return <Box sx={{ p: 4 }}>
  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
   Agregar Inventario
 </Typography>
 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
 Completa todos los campos para asegurar una correcta adición del inventario del producto a nuestro sistema. Cualquier información omitida podría afectar la gestión y visualización del inventario.
 </Typography>
 <AddInventoryItemContainer/>
</Box>

/* 
  return () */
}

export default AddProduct;
/*   */