// src\renderer\features\product\pages\UpdateProductPage.tsx
import { Box, Typography } from '@mui/material'
import React from 'react'
import UpdateProductContainer from '../containers/UpdateProductContainer'


function UpdateProductPage() {
  return (
    <Box sx={{ p: 4 }}>
       <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Modificar Producto
      </Typography> 
       <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Completa todos los campos para asegurar una correcta adición del producto a nuestro sistema. Cualquier información omitida podría afectar la gestión y visualización del inventario.
      </Typography> 
      <UpdateProductContainer/> 
    </Box>
  )
}

export default UpdateProductPage