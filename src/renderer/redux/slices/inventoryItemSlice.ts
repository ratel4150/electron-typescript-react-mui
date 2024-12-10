// src\renderer\redux\slices\inventoryItemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem } from '../../features/product/types/inventoryItem';


// Estado inicial
interface InventoryItemTypeState {
  inventoryItemTypes: InventoryItem[];
  loading: boolean;
  error: string | null;
  operationStatus: string | null;
}

const initialState: InventoryItemTypeState = {
  inventoryItemTypes: [],
  loading: false,
  error: null,
  operationStatus: null,
};

// Creación del slice para gestionar el estado de inventoryItemTypes
const inventoryItemTypeSlice = createSlice({
  name: "inventoryItemTypes", // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Reducer para iniciar la obtención de inventoryItemTypes
    fetchInventoryItemTypesRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la obtención de inventoryItemTypes
    fetchInventoryItemTypesSuccess(state, action: PayloadAction<InventoryItem[]>) {
      state.inventoryItemTypes = action.payload;
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la obtención de inventoryItemTypes
    fetchInventoryItemTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la adición de un inventoryItemType
    addInventoryItemTypeRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la adición de un inventoryItemType
    addInventoryItemTypeSuccess(state, action: PayloadAction<InventoryItem>) {
      state.inventoryItemTypes.push(action.payload);
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la adición de un inventoryItemType
    addInventoryItemTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la actualización de un inventoryItemType
    updateInventoryItemTypeRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la actualización de un inventoryItemType
    updateInventoryItemTypeSuccess(state, action: PayloadAction<InventoryItem>) {
      state.inventoryItemTypes = state.inventoryItemTypes.map((itemType) =>
        itemType._id === action.payload._id ? action.payload : itemType
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la actualización de un inventoryItemType
    updateInventoryItemTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },

    // Reducer para iniciar la eliminación de un inventoryItemType
    deleteInventoryItemTypeRequest(state) {
      state.loading = true;
      state.error = null;
      state.operationStatus = "pending";
    },

    // Reducer para manejar el éxito de la eliminación de un inventoryItemType
    deleteInventoryItemTypeSuccess(state, action: PayloadAction<string>) {
      state.inventoryItemTypes = state.inventoryItemTypes.filter(
        (itemType) => itemType._id !== action.payload
      );
      state.loading = false;
      state.operationStatus = "success";
    },

    // Reducer para manejar el fallo de la eliminación de un inventoryItemType
    deleteInventoryItemTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.operationStatus = "failed";
    },
  },
});

// Exportar las acciones generadas automáticamente por createSlice
export const {
  fetchInventoryItemTypesRequest,
  fetchInventoryItemTypesSuccess,
  fetchInventoryItemTypesFailure,
  addInventoryItemTypeRequest,
  addInventoryItemTypeSuccess,
  addInventoryItemTypeFailure,
  updateInventoryItemTypeRequest,
  updateInventoryItemTypeSuccess,
  updateInventoryItemTypeFailure,
  deleteInventoryItemTypeRequest,
  deleteInventoryItemTypeSuccess,
  deleteInventoryItemTypeFailure,
} = inventoryItemTypeSlice.actions;

// Exportar el reducer del slice para usarlo en el store
export default inventoryItemTypeSlice.reducer;