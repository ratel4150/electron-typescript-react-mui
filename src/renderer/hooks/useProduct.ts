// src\renderer\hooks\useProduct.ts
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

import { Product } from "../features/product/types/productTypes";

const useProduct = () => {
  const dispatch: AppDispatch = useDispatch();

  // Seleccionar el estado de productos desde Redux
  const { products, loading, error, operationStatus } = useSelector(
    (state: RootState) => state.products
  );

  // Función para obtener productos
  const fetchProducts = useCallback(() => {
    dispatch({ type: "products/fetchProducts" }); 
  }, [dispatch]);

  // Función para agregar un nuevo producto
   // Función para agregar un nuevo producto
   const addProduct = useCallback(
    (product: Product) => {
      dispatch({ type: "products/addProduct", payload: product }); // Dispatch the correct action type
    },
    [dispatch]
  );

  // Función para actualizar un producto existente
  const updateProduct = useCallback(
    (product: Product) => {
      dispatch({ type: "products/updateProduct", payload: product }); // Dispatch the correct action type
    },
    [dispatch]
  );

  // Función para eliminar un producto
  const deleteProduct = useCallback(
    (productId: string) => {
      dispatch({ type: "products/deleteProduct", payload: productId }); // Dispatch the correct action type
    },
    [dispatch]
  );

  return {
    products,
    loading,
    error,
    operationStatus,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;