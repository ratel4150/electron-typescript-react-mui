import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/productTypes';

interface ProductState {
  products: Product[]; // Lista de productos
  selectedProduct: Product | null; // Producto seleccionado para editar o ver detalles
  loading: boolean; // Indica si hay una operación en curso
  error: string | null; // Para manejar errores
  needsFetch: boolean; // Indica si necesitamos hacer fetch
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  needsFetch: true, // Por defecto, necesita el primer fetch
  
};
// El slice de productos
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      // Acción para cargar los productos en el estado
      setProducts(state, action: PayloadAction<Product[]>) {
        state.products = action.payload;
        state.needsFetch = false;  // Ya no hace falta hacer fetch
      },
      // Acción para agregar un producto
      addProduct(state, action: PayloadAction<Product>) {
        state.products.push(action.payload);
        state.needsFetch = true;  // Indica que se necesita hacer un fetch después de agregar
      },
      // Acción para actualizar un producto
      updateProduct(state, action: PayloadAction<Product>) {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index >= 0) {
          console.log(state.products[index]);
          
          state.products[index] = action.payload;
          state.needsFetch = true;  // Indica que se necesita hacer un fetch después de actualizar
        }
      },
      // Acción para eliminar un producto
      deleteProduct(state, action: PayloadAction<string>) {
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.needsFetch = true;  // Indica que se necesita hacer un fetch después de eliminar
      },
      // Acción para establecer el producto seleccionado
      setSelectedProduct(state, action: PayloadAction<Product | null>) {
        state.selectedProduct = action.payload;
      },
      // Acción para manejar el estado de carga
      setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
      // Acción para manejar errores
      setError(state, action: PayloadAction<string>) {
        state.error = action.payload;
      },
      // Acción para establecer si es necesario hacer fetch
      setNeedsFetch(state, action: PayloadAction<boolean>) {
        state.needsFetch = action.payload;
      },
    },
  });
  
  export const {
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setSelectedProduct,
    setLoading,
    setError,
    setNeedsFetch,
  } = productSlice.actions;
  
  export default productSlice.reducer;