// src\renderer\redux\actions\inventoryItemTypes.ts
export const GET_INVENTORY_ITEMS = 'GET_INVENTORY_ITEMS'; // Acción para iniciar la solicitud de items de inventario
export const GET_INVENTORY_ITEMS_SUCCESSFUL = 'GET_INVENTORY_ITEMS_SUCCESSFUL'; // Acción cuando los items de inventario se obtienen exitosamente
export const GET_INVENTORY_ITEMS_FAILED = 'GET_INVENTORY_ITEMS_FAILED'; // Acción cuando la solicitud falla
export const GET_INVENTORY_ITEMS_COMPLETED = 'GET_INVENTORY_ITEMS_COMPLETED'; // Acción para indicar que el proceso terminó

// Acciones para agregar items de inventario
export const ADD_INVENTORY_ITEM = 'ADD_INVENTORY_ITEM'; // Acción para iniciar la solicitud de agregar un item de inventario
export const ADDED_INVENTORY_ITEM = 'ADDED_INVENTORY_ITEM'; // Acción cuando el item de inventario se agrega exitosamente
export const ADD_INVENTORY_ITEM_FAILED = 'ADD_INVENTORY_ITEM_FAILED'; // Acción cuando la solicitud de agregar un item falla
export const ADD_INVENTORY_ITEM_COMPLETED = 'ADD_INVENTORY_ITEM_COMPLETED'; // Acción para indicar que el proceso de agregar un item ha terminado

// Acciones para actualizar items de inventario
export const UPDATE_INVENTORY_ITEM = 'UPDATE_INVENTORY_ITEM'; // Acción para iniciar la actualización de un item de inventario
export const UPDATE_INVENTORY_ITEM_PENDING = 'UPDATE_INVENTORY_ITEM_PENDING'; // Acción para indicar que la actualización está en progreso
export const UPDATE_INVENTORY_ITEM_COMPLETED = 'UPDATE_INVENTORY_ITEM_COMPLETED'; // Acción para indicar que la actualización se ha completado (éxito o fallo)
export const UPDATE_INVENTORY_ITEM_FAILURE = 'UPDATE_INVENTORY_ITEM_FAILURE'; // Acción para manejar errores en la actualización

// Acciones para eliminar items de inventario
export const DELETE_INVENTORY_ITEM = 'DELETE_INVENTORY_ITEM'; // Acción para iniciar la eliminación de un item de inventario
export const DELETE_INVENTORY_ITEM_INITIATED = 'DELETE_INVENTORY_ITEM_INITIATED'; // Acción para indicar que la eliminación se ha iniciado
export const DELETE_INVENTORY_ITEM_SUCCESS = 'DELETE_INVENTORY_ITEM_SUCCESS'; // Acción cuando la eliminación se realiza exitosamente
export const DELETE_INVENTORY_ITEM_CANCELLED = 'DELETE_INVENTORY_ITEM_CANCELLED'; // Acción para manejar una eliminación cancelada
export const DELETE_INVENTORY_ITEM_COMPLETED = 'DELETE_INVENTORY_ITEM_COMPLETED'; // Acción para indicar que el proceso de eliminación ha terminado
