// src\renderer\redux\sagas\index.ts
import { all } from 'redux-saga/effects';
import productSaga from './productSaga';
import departmentSaga from './departmentSaga'

// Saga raíz
export function* rootSaga() {
  yield all([
    productSaga(), // Incluimos las sagas relacionadas con productos
    departmentSaga()

  ]);
}