// src\renderer\features\product\containers\AddProductContainer.tsx
import React from 'react'
import ProductForm from '../components/ProductForm';

import { useNavigate } from 'react-router-dom';
import { Product } from '../types/productTypes';

import { Alert, AlertProps, Snackbar } from '@mui/material';
import useProduct from '../../../hooks/useProduct';
const AddProductContainer = () => {

    const { addProduct, loading, error, operationStatus } = useProduct(); // Usamos el hook
 
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false); 

   // Este useEffect muestra el mensaje cuando el producto se agrega correctamente
   React.useEffect(() => {
    if (hasSubmitted) {
      if (operationStatus === 'success') {
        setSnackbar({ children: 'Producto agregado correctamente', severity: 'success' });
      } else if (operationStatus === 'failed' && error) {
        setSnackbar({ children: `Error al agregar el producto: ${error}`, severity: 'error' });
      }
    }
  }, [operationStatus, error, hasSubmitted]); // Ahora dependemos de hasSubmitted

  const handleFormSubmit = (product: any) => {
    setHasSubmitted(true); // Marcar como enviado
    addProduct(product); // Llama a la acción para agregar el producto
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <>
    <ProductForm type='add' onSubmit={handleFormSubmit} />
    {!!snackbar && (
      <Snackbar
        open
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
      >
        <Alert {...snackbar} onClose={handleCloseSnackbar} />
      </Snackbar>
    )}
    {loading && <div>Cargando...</div>} {/* Puedes personalizar esto */}
  </>
  )
}

export default AddProductContainer