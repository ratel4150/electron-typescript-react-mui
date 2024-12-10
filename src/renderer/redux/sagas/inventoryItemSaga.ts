// src\renderer\redux\sagas\inventoryItemSaga.ts
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
