// src\renderer\hooks\useDepartment.ts

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useCallback } from "react";
import { Department } from "../features/product/types/departmentTypes";


const useDepartment = () => {

    const dispatch: AppDispatch = useDispatch();

    // Seleccionar el estado de productos desde Redux
    const { departments, loading, error, operationStatus } = useSelector(
        (state: RootState) => state.departments
    );

    const fetchDepartments = useCallback(() => {
        dispatch({ type: "departments/fetchDepartments" });
    }, [dispatch]);


    const addDepartment = useCallback(
        (department: Department) => {
          dispatch({ type: "departments/addDepartment", payload: department }); // Dispatch the correct action type
        },
        [dispatch]
      );



    return {
        departments,
        loading,
        error,
        operationStatus,
        fetchDepartments,
        addDepartment
    }

}

export default useDepartment