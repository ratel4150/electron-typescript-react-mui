// src\renderer\features\product\pages\ImportProductsPage.tsx
import { Box, Typography } from '@mui/material'
import React from 'react'
import ImportProductContainer from '../containers/ImportProductContainer'

function ImportProductsPage() {
  return (
    <Box sx={{ p: 4 }}>
    <Typography  variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
     Importar Productos  
   </Typography>
   <Typography variant="body2" sx={{ color: 'text.secondary' ,mb:3 }}>
   Completa todos los campos para asegurar una correcta adición del producto a nuestro sistema. Cualquier información omitida podría afectar la gestión y visualización del inventario.
   </Typography>
   <ImportProductContainer/>
  
 </Box>
  )
}

export default ImportProductsPage