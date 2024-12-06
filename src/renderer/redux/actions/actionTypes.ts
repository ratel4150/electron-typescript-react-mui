// src\renderer\redux\actions\actionTypes.ts
// Acciones relacionadas con la obtención de productos
export const GET_PRODUCTS = 'GET_PRODUCTS'; // Acción para iniciar la solicitud de productos
export const GET_PRODUCTS_SUCCESSFUL = 'GET_PRODUCTS_SUCCESSFUL'; // Acción cuando los productos se obtienen exitosamente
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'; // Acción cuando la solicitud falla

// Acción para manejar cuando la solicitud ha terminado, independientemente del resultado
export const GET_PRODUCTS_COMPLETED = 'GET_PRODUCTS_COMPLETED'; // Acción para indicar que el proceso terminó


// Acciones para agregar productos
export const ADD_PRODUCT = 'ADD_PRODUCT'; // Acción para iniciar la solicitud de agregar un producto
export const ADDED_PRODUCT = 'ADDED_PRODUCT'; // Acción cuando el producto se agrega exitosamente
export const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED'; // Acción cuando la solicitud de agregar un producto falla
export const ADD_PRODUCT_COMPLETED = 'ADD_PRODUCT_COMPLETED'; // Acción para indicar que el proceso de agregar un producto ha terminado

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'; // Acción para iniciar la actualización
export const UPDATE_PRODUCT_PENDING = 'UPDATE_PRODUCT_PENDING'; // Acción para indicar que la actualización está en progreso
export const UPDATE_PRODUCT_COMPLETED = 'UPDATE_PRODUCT_COMPLETED'; // Acción para indicar que la actualización se ha completado (éxito o fallo)
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE'; // Acción para manejar errores en la actualización
export const DELETE_PRODUCT = 'DELETE_PRODUCT'; 
export const DELETE_PRODUCT_INITIATED = 'DELETE_PRODUCT_INITIATED';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_CANCELLED = 'DELETE_PRODUCT_CANCELLED';
export const DELETE_PRODUCT_COMPLETED = 'DELETE_PRODUCT_COMPLETED';
