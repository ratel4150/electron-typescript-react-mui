// src\renderer\redux\sagas\inventoryItemSaga.ts

import { call, put, takeEvery } from "redux-saga/effects";


import { InventoryItem } from "../../features/product/types/inventoryItem";
import { addInventoryItemTypeFailure, addInventoryItemTypeRequest, addInventoryItemTypeSuccess, fetchInventoryItemTypesFailure, fetchInventoryItemTypesRequest, fetchInventoryItemTypesSuccess, updateInventoryItemTypeFailure, updateInventoryItemTypeRequest, updateInventoryItemTypeSuccess } from "../slices/inventoryItemSlice";
import { createInventoryItem, getAllInventoryItems,updateInventoryItem } from "../../features/inventory/services/inventoryService";
import { PayloadAction } from "@reduxjs/toolkit";


// Saga para obtener los productos
function* getInventoryItemSaga(): Generator<any, void, InventoryItem[]> {
    try {
      yield put(fetchInventoryItemTypesRequest());
  
      
      const inventoryItem: InventoryItem[] = yield call(getAllInventoryItems);
      console.log(inventoryItem);
      
      yield put(fetchInventoryItemTypesSuccess(inventoryItem));
    } catch (error: any) {
      yield put(fetchInventoryItemTypesFailure(error.message || "Unknown error"));
    }
  }

  
  // Saga para agregar un producto
function* addInventoryItemSaga(action: PayloadAction<InventoryItem>): Generator<any, void, InventoryItem> {
  try {
    yield put(addInventoryItemTypeRequest());
    const newInventoryItem: InventoryItem = yield call(createInventoryItem, action.payload);
    yield put(addInventoryItemTypeSuccess(newInventoryItem));
  } catch (error: any) {
    yield put(addInventoryItemTypeFailure(error.message || "Unknown error"));
  }
}



// Saga para actualizar un producto
function* updateInventoryItemSaga(action: PayloadAction<InventoryItem>): Generator<any, void, InventoryItem> {
  try {
    yield put(updateInventoryItemTypeRequest());
    const updatedInventoryItem: InventoryItem = yield call(updateInventoryItem, action.payload);
    yield put(updateInventoryItemTypeSuccess(updatedInventoryItem));
  } catch (error: any) {
    yield put(updateInventoryItemTypeFailure(error.message || "Unknown error"));
  }
}
// Watchers para escuchar las acciones de productos
export default function* inventoryItemSaga() {
  yield takeEvery("inventoryItem/fetchInventoryItem", getInventoryItemSaga);
  yield takeEvery("inventoryItem/addInventoryItem", addInventoryItemSaga);
  yield takeEvery("inventoryItem/updateInventoryItem", updateInventoryItemSaga);
 /*  yield takeEvery("products/addProduct", addProductSaga);
  
  yield takeEvery("products/deleteProduct", deleteProductSaga); */
}