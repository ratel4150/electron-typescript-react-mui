// src\renderer\redux\slices\index.ts

import productReducer from './productSlice';
import departmentReducer from './departmenSlice'

const rootReducers = {
  products: productReducer,
  departments:departmentReducer
  // Puedes agregar más slices aquí
};

export default rootReducers;
