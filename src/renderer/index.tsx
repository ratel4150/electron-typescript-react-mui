// src\renderer\index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
/* import store, { persistor } from "./redux"; */
/* import { PersistGate } from "redux-persist/integration/react"; */

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<HashRouter> <Provider store={store}> {/* <PersistGate loading={null} persistor={persistor}> */}<App />    {/* </PersistGate> */}</Provider>,</HashRouter>);
