// src\renderer\redux\slices\productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../features/product/types/productTypes';




// Estado inicial
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  operationStatus: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  operationStatus: null,
};
// Creación del slice para gestionar el estado de productos
const productSlice = createSlice({
  name: "products", // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para iniciar la obtención de productos
    fetchProductsRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la obtención de productos
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la obtención de productos
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la adición de un producto
    addProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la adición de un producto
    addProductSuccess(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la adición de un producto
    addProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la actualización de un producto
    updateProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la actualización de un producto
    updateProductSuccess(state, action: PayloadAction<Product>) {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la actualización de un producto
    updateProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la eliminación de un producto
    deleteProductRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la eliminación de un producto
    deleteProductSuccess(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la eliminación de un producto
    deleteProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },
  },
});

// Exportar las acciones generadas automáticamente por createSlice
export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

// Exportar el reducer del slice para usarlo en el store
export default productSlice.reducer;
