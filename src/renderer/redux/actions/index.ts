// src\renderer\redux\actions\index.ts
import { Product } from "../../features/product/types/productTypes";
import { ADD_PRODUCT, ADD_PRODUCT_COMPLETED, ADD_PRODUCT_FAILED, ADDED_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCT_CANCELLED, DELETE_PRODUCT_COMPLETED, DELETE_PRODUCT_INITIATED, DELETE_PRODUCT_SUCCESS, GET_PRODUCTS, GET_PRODUCTS_COMPLETED, GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESSFUL, UPDATE_PRODUCT, UPDATE_PRODUCT_COMPLETED, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_PENDING } from "./actionTypes";


// Acción para iniciar la solicitud de productos
export const getProducts = () => ({
    type: GET_PRODUCTS,
  });
  
  // Acción cuando los productos se obtienen exitosamente
  export const getProductsSuccessful = (payload: Product[]) => ({
    type: GET_PRODUCTS_SUCCESSFUL,
    payload,
  });
  
  // Acción cuando la solicitud falla
  export const getProductsFailed = (error: string) => ({
    type: GET_PRODUCTS_FAILED,
    error,
  });
  
  // Acción para manejar cuando la solicitud ha terminado, independientemente del resultado
  export const getProductsCompleted = () => ({
    type: GET_PRODUCTS_COMPLETED,
  });


// Acción para iniciar la solicitud de agregar un producto
export const addProduct = (data: Partial<Product>) => ({
    type: ADD_PRODUCT,
    payload: data,  // Aquí pasas los datos del producto que deseas agregar
  });
  
  // Acción cuando el producto se ha agregado exitosamente
  export const addedProduct = (data: Product) => ({
    type: ADDED_PRODUCT,
    payload: data,  // Aquí pasas los datos del producto agregado
  });
  
  // Acción cuando la solicitud de agregar un producto falla
  export const addProductFailed = (error: string) => ({
    type: ADD_PRODUCT_FAILED,
    error,  // El mensaje de error
  });
  
  // Acción para indicar que el proceso de agregar un producto ha terminado
  export const addProductCompleted = () => ({
    type: ADD_PRODUCT_COMPLETED,
  });

  export const updateProduct = ( data: Partial<Product>) => ({
    
    type: UPDATE_PRODUCT,
    payload: data,
  });
  
  export const updateProductPending = () => ({
    type: UPDATE_PRODUCT_PENDING,
  });
  
  export const updateProductCompleted = (data: Product) => ({
    type: UPDATE_PRODUCT_COMPLETED,
    payload: data,
  });
  
  export const updateProductFailure = (error: Error) => ({
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
  });

export const deleteProduct = (id: string) => ({
    type: DELETE_PRODUCT,
    payload: id,
});


// Acción cuando la eliminación del producto ha sido iniciada
export const deleteProductInitiated = () => ({
  type: DELETE_PRODUCT_INITIATED,
});

// Acción cuando la eliminación del producto es exitosa
export const deleteProductSuccess = (id: string) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: id,
});

// Acción cuando la eliminación del producto es cancelada
export const deleteProductCancelled = () => ({
  type: DELETE_PRODUCT_CANCELLED,
});

// Acción cuando el proceso de eliminación de un producto ha terminado
export const deleteProductCompleted = () => ({
  type: DELETE_PRODUCT_COMPLETED,
});