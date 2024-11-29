import React from 'react';
import AddProductContainer from '../containers/AddProductContainer';
import { Box, Typography } from '@mui/material';

const AddProductPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
       <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Nuevo Producto
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Completa todos los campos para asegurar una correcta adición del producto a nuestro sistema. Cualquier información omitida podría afectar la gestión y visualización del inventario.
      </Typography>
      <AddProductContainer />
    </Box>
  );
};

export default AddProductPage;
