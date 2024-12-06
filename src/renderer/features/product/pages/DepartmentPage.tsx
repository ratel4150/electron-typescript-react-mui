// src\renderer\features\product\pages\DepartmentPage.tsx
import { Box, Typography } from '@mui/material'
import React from 'react'
import DepartmentContainer from '../containers/DepartmentContainer'

function DepartmentPage() {
  return (
    <Box sx={{ p: 4 }}>
    <Typography  variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
     Gestion de Departamentos 
   </Typography>
   <Typography variant="body2" sx={{ color: 'text.secondary' ,mb:3 }}>
   Completa todos los campos para asegurar una correcta adición del producto a nuestro sistema. Cualquier información omitida podría afectar la gestión y visualización del inventario.
   </Typography>
   <DepartmentContainer/>
  
 </Box>
  )
}

export default DepartmentPage