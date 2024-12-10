// src\renderer\redux\slices\index.ts

import productReducer from './productSlice';
import departmentReducer from './departmenSlice'
import inventoryItemReducer from './inventoryItemSlice'

const rootReducers = {
  products: productReducer,
  departments:departmentReducer,
  inventoryItem:inventoryItemReducer
  // Puedes agregar más slices aquí
};

export default rootReducers;
