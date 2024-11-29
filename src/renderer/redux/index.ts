import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from '../features/product/services/productSlice';
import createSagaMiddleware from 'redux-saga';
import watchFetchProducts from '../features/product/sagas/sagas';

// Configuración de Redux-Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['product'], // Sólo persistir el reducer de productos
  };

  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, productReducer);
  
  const store = configureStore({
    reducer: {
      product: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'], // Ignorar las acciones de persistencia
        },
        thunk: false,
      }).concat(sagaMiddleware),
      devTools: process.env.NODE_ENV !== 'production',
  });
  
  sagaMiddleware.run(watchFetchProducts);
  
  export const persistor = persistStore(store); // Crea el persistor
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;