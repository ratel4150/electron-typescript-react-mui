// src\renderer\redux\store.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./sagas";
import rootReducers from "./slices/index";
import logger from "redux-logger";

// Crea el middleware para Redux-Saga
const sagaMiddleware = createSagaMiddleware();

// Función para determinar el nivel de logging
const getLogLevel = (actionType: string, environment: string) => {
  if (environment === 'production') {
    // En producción solo mostrar warnings o errores
    if (actionType.includes('error')) return 'error';
    if (actionType.includes('warn')) return 'warn';
    return 'info'; // Default
  }
  // En desarrollo, registrar todos los niveles
  return 'log';
};
// Configura el store con Redux Toolkit
export const store = configureStore({
  reducer: rootReducers, // Reducer raíz
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Desactiva thunk si solo usas sagas
    }).concat(sagaMiddleware) .concat(logger), // Agrega redux-logger como middleware adicional, // Agrega saga como middleware
    

});

// Ejecuta el saga raíz
sagaMiddleware.run(rootSaga);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;