import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from "./actionTypes";


export const getProducts = () => {
    return {
        type: GET_PRODUCTS,
    };
};
export const addPost = (data:any) => {
    return {
        type: ADD_PRODUCT, payload: data
    };
};
export const updatePost = (data:any) => {
    return {
        type: UPDATE_PRODUCT, payload: data
    };
};
export const deletePost = (id:any) => {
    return {
        type: DELETE_PRODUCT, payload: id
    };
};