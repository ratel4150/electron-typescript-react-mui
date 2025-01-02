// src\renderer\hooks\useInventoryItem.ts

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useCallback } from "react";
import { InventoryItem } from "../features/product/types/inventoryItem";

const useInventoryItem = () => {

    const dispatch: AppDispatch = useDispatch();

    // Seleccionar el estado de productos desde Redux
    const {  inventoryItemTypes, loading, error, operationStatus } = useSelector(
        (state: RootState) => state.inventoryItem
    );

    const fetchInventoryItems = useCallback(() => {
        dispatch({ type: "inventoryItem/fetchInventoryItem" });
    }, [dispatch]);


     const addInventoryItemn = useCallback(
        (inventoryItem:InventoryItem ) => {
          dispatch({ type: "inventoryItem/addInventoryItem", payload: inventoryItem }); // Dispatch the correct action type
        },
        [dispatch]
      ); 

        // Función para actualizar un producto existente
        const updateInventoryItem = useCallback(
          (inventoryItem: InventoryItem) => {
            dispatch({ type: "inventoryItem/updateInventoryItem", payload: inventoryItem }); // Dispatch the correct action type
          },
          [dispatch]
        );



    return {
        inventoryItemTypes,
        loading,
        operationStatus,
        fetchInventoryItems,
         addInventoryItemn,
         updateInventoryItem
    }

}

export default useInventoryItem