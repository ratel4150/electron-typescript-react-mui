// src\renderer\redux\sagas\departmentSaga.ts

import { call, put, takeEvery } from "redux-saga/effects";
import { Department } from "../../features/product/types/departmentTypes";
import { addDepartmentFailure, addDepartmentRequest, addDepartmentSuccess, fetchDepartmentsFailure, fetchDepartmentsRequest, fetchDepartmentsSuccess } from "../slices/departmenSlice";
import { getDepartments , createDepartment} from "../../features/product/services/departmentService";
import { PayloadAction } from "@reduxjs/toolkit";

// Saga para obtener los productos
function* getDepartmentsSaga(): Generator<any, void, Department[]> {
    try {
      yield put(fetchDepartmentsRequest());
  
      
      const products: Department[] = yield call(getDepartments);
      console.log(products);
      
      yield put(fetchDepartmentsSuccess(products));
    } catch (error: any) {
      yield put(fetchDepartmentsFailure(error.message || "Unknown error"));
    }
  }



  // Saga para agregar un producto
function* addProductSaga(action: PayloadAction<Department>): Generator<any, void, Department> {
    try {
      yield put(addDepartmentRequest());
      const newDepartment: Department = yield call(createDepartment, action.payload);
      yield put(addDepartmentSuccess(newDepartment));
    } catch (error: any) {
      yield put(addDepartmentFailure(error.message || "Unknown error"));
    }
  }


  // Watchers para escuchar las acciones de productos
export default function* productSaga() {
    yield takeEvery("departments/fetchDepartments", getDepartmentsSaga);
    yield takeEvery("departments/addDepartment", addProductSaga);
  
  }