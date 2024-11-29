import { combineReducers } from "redux";

import addProduct from "./addProduct";
import getProducts from "./getProducts";
import updateProduct from "./updateProduct";
import deleteProduct from "./deleteProduct";

export default combineReducers({
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
});
