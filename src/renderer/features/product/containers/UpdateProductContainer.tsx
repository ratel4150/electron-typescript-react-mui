import React, { useState } from 'react'
import ProductFinder from '../components/ProductFinder'
import { getProductsByBarCode, updateProduct } from '../services/productService';
import { Product } from '../types/productTypes';
import { Alert, AlertProps, Box, Snackbar, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';
import useProduct from '../hook/useProduct';

const UpdateProductContainer: React.FC = () => {
    const { updateExistingProduct } = useProduct(); // Obtienes la función de actualización
    const [product, setProduct] = useState<Product | null>(null); // Almacena una lista de productos
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
    const handleSearch = async (barCode:string) => {
      setLoading(true);
      setError(null);
      setProduct(null);
  
      try {
        const productData = await getProductsByBarCode(barCode);
        console.log(productData);
        
        setProduct(productData);
      } catch (err) {
        setError("No se pudo encontrar el producto. Verifica el código de barras.");
      } finally {
        setLoading(false);
      }
    };

    const handleCancel = () => {
        setError(null);
        setProduct(null);
      };
     


      const handleFormSubmit = async (product: Partial<Product>) => {
      

        try {
          if (!product._id) {
            throw new Error('El producto no tiene un ID válido.');
          }
          const id = String(product._id)

          const productData = await updateProduct(id,product);
          console.log(productData);
      
          const updatedProduct: any = {
            ...product, // Asegúrate de que `product` contenga todos los campos requeridos
          };
      
          updateExistingProduct(updatedProduct); // Actualiza el producto en Redux
      
          setSnackbar({ children: 'Producto actualizado correctamente', severity: 'success' });
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
          setSnackbar({ children: 'Error al actualizar el producto', severity: 'error' });
        }
        
  
      };
      
      const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <Box sx={{ padding: 2 }}>
   <ProductFinder 
  onSearch={handleSearch} // Pasa la función para manejar la búsqueda
  loading={loading}       // Pasa el estado de carga
  onCancel={handleCancel} // Pasa la función opcional para manejar la cancelación
/>
{error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
      {product && (
      <ProductForm type='update' onSubmit={handleFormSubmit} initialData={product} />
      )}
      {!product && !error && !loading && (
        <Typography sx={{ marginTop: 2 }}>Por favor, busca un producto utilizando el código de barras.</Typography>
      )}
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
  </Box>
  )
}

export default UpdateProductContainer