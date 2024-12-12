// src\renderer\hooks\useInventoryItem.ts

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useCallback } from "react";

const useInventoryItem = () => {

    const dispatch: AppDispatch = useDispatch();

    // Seleccionar el estado de productos desde Redux
    const {  inventoryItemTypes, loading, error, operationStatus } = useSelector(
        (state: RootState) => state.inventoryItem
    );

    const fetchInventoryItems = useCallback(() => {
        dispatch({ type: "inventoryItem/fetchInventoryItem" });
    }, [dispatch]);


   /*  const addDepartment = useCallback(
        (department: Department) => {
          dispatch({ type: "departments/addDepartment", payload: department }); // Dispatch the correct action type
        },
        [dispatch]
      ); */



    return {
        inventoryItemTypes,
        loading,
        error,
        operationStatus,
        fetchInventoryItems,
       /*  addDepartment */
    }

}

export default useInventoryItem