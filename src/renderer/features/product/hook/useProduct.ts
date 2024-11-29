import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { setProducts, addProduct, updateProduct, setSelectedProduct, setNeedsFetch } from '../services/productSlice';
import { Product } from '../types/productTypes';

// Devuelve el estado del producto y un setter
export const useProduct = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);

  // Función para establecer productos
  const setProduct = useCallback(
    (newProduct: Product | Partial<Product> | Product[]) => {
      if (Array.isArray(newProduct)) {
        dispatch(setProducts(newProduct));
      } else {
        dispatch(addProduct(newProduct as Product));
      }
    },
    [dispatch]
  );

  // Función para seleccionar un producto
  const selectProduct = useCallback(
    (product: Product | null) => {
      dispatch(setSelectedProduct(product));
    },
    [dispatch]
  );
    // Función para actualizar un producto
    const updateExistingProduct = useCallback(
      (product: Product) => {
        dispatch(updateProduct(product)); // Llamamos a la acción updateProduct en Redux
      },
      [dispatch]
    );

  // Función para establecer si es necesario hacer fetch
  const setFetchNeeded = useCallback((needed: boolean) => {
    dispatch(setNeedsFetch(needed));
  }, [dispatch]);

  return {
    products: productState.products,
    selectedProduct: productState.selectedProduct,
    setProduct,
    selectProduct,
    updateExistingProduct,
    loading: productState.loading,
    error: productState.error,
    needsFetch: productState.needsFetch, // Ahora se exporta needsFetch
    setFetchNeeded, // También exportamos el setter de `needsFetch`
  };
};

export default useProduct;
