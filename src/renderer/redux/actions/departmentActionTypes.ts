// src\renderer\redux\actions\departmentActionTypes.ts

// Acciones relacionadas con la obtención de departamentos
export const GET_DEPARTMENTS = 'GET_DEPARTMENTS'; // Acción para iniciar la solicitud de departamentos
export const GET_DEPARTMENTS_SUCCESSFUL = 'GET_DEPARTMENTS_SUCCESSFUL'; // Acción cuando los departamentos se obtienen exitosamente
export const GET_DEPARTMENTS_FAILED = 'GET_DEPARTMENTS_FAILED'; // Acción cuando la solicitud falla

// Acción para manejar cuando la solicitud ha terminado, independientemente del resultado
export const GET_DEPARTMENTS_COMPLETED = 'GET_DEPARTMENTS_COMPLETED'; // Acción para indicar que el proceso terminó

// Acciones para agregar departamentos
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT'; // Acción para iniciar la solicitud de agregar un departamento
export const ADDED_DEPARTMENT = 'ADDED_DEPARTMENT'; // Acción cuando el departamento se agrega exitosamente
export const ADD_DEPARTMENT_FAILED = 'ADD_DEPARTMENT_FAILED'; // Acción cuando la solicitud de agregar un departamento falla
export const ADD_DEPARTMENT_COMPLETED = 'ADD_DEPARTMENT_COMPLETED'; // Acción para indicar que el proceso de agregar un departamento ha terminado

// Acciones para actualizar departamentos
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT'; // Acción para iniciar la actualización
export const UPDATE_DEPARTMENT_PENDING = 'UPDATE_DEPARTMENT_PENDING'; // Acción para indicar que la actualización está en progreso
export const UPDATE_DEPARTMENT_COMPLETED = 'UPDATE_DEPARTMENT_COMPLETED'; // Acción para indicar que la actualización se ha completado (éxito o fallo)
export const UPDATE_DEPARTMENT_FAILURE = 'UPDATE_DEPARTMENT_FAILURE'; // Acción para manejar errores en la actualización

// Acciones para eliminar departamentos
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT'; // Acción para iniciar la solicitud de eliminación
export const DELETE_DEPARTMENT_INITIATED = 'DELETE_DEPARTMENT_INITIATED'; // Acción para indicar que la eliminación ha comenzado
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'; // Acción cuando el departamento se elimina exitosamente
export const DELETE_DEPARTMENT_CANCELLED = 'DELETE_DEPARTMENT_CANCELLED'; // Acción cuando la eliminación es cancelada
export const DELETE_DEPARTMENT_COMPLETED = 'DELETE_DEPARTMENT_COMPLETED'; // Acción para indicar que el proceso de eliminación ha terminado
