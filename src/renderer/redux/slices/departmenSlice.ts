// src\renderer\redux\slices\departmenSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Department } from '../../features/product/types/departmentTypes';


// Estado inicial
interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  operationStatus: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
  operationStatus: null,
};

// Creación del slice para gestionar el estado de departamentos
const departmentSlice = createSlice({
  name: "departments", // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para iniciar la obtención de departamentos
    fetchDepartmentsRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la obtención de departamentos
    fetchDepartmentsSuccess(state, action: PayloadAction<Department[]>) {
      state.departments = action.payload;
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la obtención de departamentos
    fetchDepartmentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la adición de un departamento
    addDepartmentRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la adición de un departamento
    addDepartmentSuccess(state, action: PayloadAction<Department>) {
      state.departments.push(action.payload);
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la adición de un departamento
    addDepartmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la actualización de un departamento
    updateDepartmentRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la actualización de un departamento
    updateDepartmentSuccess(state, action: PayloadAction<Department>) {
      state.departments = state.departments.map((department) =>
        department._id === action.payload._id ? action.payload : department
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la actualización de un departamento
    updateDepartmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la eliminación de un departamento
    deleteDepartmentRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la eliminación de un departamento
    deleteDepartmentSuccess(state, action: PayloadAction<string>) {
      state.departments = state.departments.filter(
        (department) => department._id !== action.payload
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la eliminación de un departamento
    deleteDepartmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },
  },
});

// Exportar las acciones generadas automáticamente por createSlice
export const {
  fetchDepartmentsRequest,
  fetchDepartmentsSuccess,
  fetchDepartmentsFailure,
  addDepartmentRequest,
  addDepartmentSuccess,
  addDepartmentFailure,
  updateDepartmentRequest,
  updateDepartmentSuccess,
  updateDepartmentFailure,
  deleteDepartmentRequest,
  deleteDepartmentSuccess,
  deleteDepartmentFailure,
} = departmentSlice.actions;

// Exportar el reducer del slice para usarlo en el store
export default departmentSlice.reducer;