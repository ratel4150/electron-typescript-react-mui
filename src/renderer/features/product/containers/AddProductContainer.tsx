import React from 'react';
import ProductForm from '../components/ProductForm';

import { useNavigate } from 'react-router-dom';
import { Product } from '../types/productTypes';
import { createProduct } from '../services/productService';
import { Alert, AlertProps, Snackbar } from '@mui/material';
import useProduct from '../hook/useProduct';

const AddProductContainer: React.FC = () => {

  const { setProduct } = useProduct();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const handleFormSubmit = async (product: Partial<Product>) => {
    try {
      const response =await createProduct(product);
      console.log('Datos de la respuesta:', response); // Aquí es donde se debe inspeccionar
    
    if (response._id) {
      setProduct({ ...product, id: response._id }); // Guarda el producto con el nuevo `_id`
    }

      setSnackbar({ children: 'Producto agregado correctamente', severity: 'success' });
      setTimeout(() => {
        navigate('/productos'); // Redirigir a la lista de productos después de un tiempo
      }, 2000);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      setSnackbar({ children: 'Error al agregar el producto', severity: 'error' });
    }
  };
  const handleCloseSnackbar = () => setSnackbar(null);
  return (
    <> <ProductForm type='add' onSubmit={handleFormSubmit} />
     {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
   
  );
};

export default AddProductContainer;
