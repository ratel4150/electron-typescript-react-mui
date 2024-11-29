import { takeEvery, call, put } from 'redux-saga/effects';
import { setProducts, setLoading, setError, setNeedsFetch } from '../services/productSlice';
import { getProducts } from '../services/productService';
import { Product } from '../types/productTypes';

// El tipo de la función generadora para fetchProducts
function* fetchProducts(): Generator {
    try {
      yield put(setLoading(true)); // Inicia la carga
      const products: any = yield call(getProducts); // Llama al API y obtiene productos
      yield put(setProducts(products)); // Guarda los productos en el estado
      yield put(setNeedsFetch(false)); // Indica que no es necesario hacer más fetch
    } catch (error:any) {
      yield put(setError('Error fetching products')); // Maneja el error
    } finally {
      yield put(setLoading(false)); // Detiene el estado de carga
    }
  }
  
  // Watcher Saga: dispara la saga `fetchProducts` cuando se llama la acción `fetchProducts`
  function* watchFetchProducts(): Generator {
    yield takeEvery('product/fetchProducts', fetchProducts);
  }
  
  export default watchFetchProducts;