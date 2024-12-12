// src\renderer\redux\sagas\inventoryItemSaga.ts

import { call, put, takeEvery } from "redux-saga/effects";
import { Department } from "../../features/product/types/departmentTypes";

import { InventoryItem } from "../../features/product/types/inventoryItem";
import { fetchInventoryItemTypesFailure, fetchInventoryItemTypesRequest, fetchInventoryItemTypesSuccess } from "../slices/inventoryItemSlice";
import { getAllInventoryItems } from "../../features/inventory/services/inventoryService";

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
// Watchers para escuchar las acciones de productos
export default function* inventoryItemSaga() {
  yield takeEvery("inventoryItem/fetchInventoryItem", getInventoryItemSaga);
 /*  yield takeEvery("products/addProduct", addProductSaga);
  yield takeEvery("products/updateProduct", updateProductSaga);
  yield takeEvery("products/deleteProduct", deleteProductSaga); */
}