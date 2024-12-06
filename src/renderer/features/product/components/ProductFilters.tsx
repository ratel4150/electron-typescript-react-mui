// src\renderer\features\product\components\ProductFilters.tsx
import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'

const ProductFilters = () => {
  return (
    <Box sx={{ marginBottom: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField label="Buscar Producto" fullWidth />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField label="Rango de Fechas" type="date" fullWidth InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" fullWidth>
          Aplicar Filtros
        </Button>
      </Grid>
    </Grid>
  </Box>
  )
}

export default ProductFilters