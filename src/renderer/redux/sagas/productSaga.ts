// src\renderer\redux\sagas\productSaga.ts
import { call, delay, put, takeEvery } from "redux-saga/effects";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} from "../slices/productSlice";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../features/product/services/productService";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../features/product/types/productTypes";

// Saga para obtener los productos
function* getProductsSaga(): Generator<any, void, Product[]> {
  try {
    yield put(fetchProductsRequest());

    
    const products: Product[] = yield call(getProducts);
    console.log(products);
    
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || "Unknown error"));
  }
}

// Saga para agregar un producto
function* addProductSaga(action: PayloadAction<Product>): Generator<any, void, Product> {
  try {
    yield put(addProductRequest());
    const newProduct: Product = yield call(createProduct, action.payload);
    yield put(addProductSuccess(newProduct));
  } catch (error: any) {
    yield put(addProductFailure(error.message || "Unknown error"));
  }
}

// Saga para actualizar un producto
function* updateProductSaga(action: PayloadAction<Product>): Generator<any, void, Product> {
  try {
    yield put(updateProductRequest());
    const updatedProduct: Product = yield call(updateProduct, action.payload);
    yield put(updateProductSuccess(updatedProduct));
  } catch (error: any) {
    yield put(updateProductFailure(error.message || "Unknown error"));
  }
}

// Saga para eliminar un producto
function* deleteProductSaga(action: PayloadAction<string>): Generator<any, void, void> {
  try {
    yield put(deleteProductRequest());
    yield call(deleteProduct, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteProductFailure(error.message || "Unknown error"));
  }
}

// Watchers para escuchar las acciones de productos
export default function* productSaga() {
  yield takeEvery("products/fetchProducts", getProductsSaga);
  yield takeEvery("products/addProduct", addProductSaga);
  yield takeEvery("products/updateProduct", updateProductSaga);
  yield takeEvery("products/deleteProduct", deleteProductSaga);
}