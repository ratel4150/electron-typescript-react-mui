// src\renderer\redux\sagas\inventoryItemSaga.ts

import { call, put } from "redux-saga/effects";
import { Department } from "../../features/product/types/departmentTypes";
import { fetchDepartmentsFailure, fetchDepartmentsRequest, fetchDepartmentsSuccess } from "../slices/departmenSlice";
import { getDepartments } from "../../features/product/services/departmentService";

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
