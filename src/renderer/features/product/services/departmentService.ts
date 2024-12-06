// src\renderer\features\product\services\departmentService.ts
import axiosInstance from "../../../api/axiosInstance";
import { Department } from "../types/departmentTypes";

// src\renderer\features\product\services\departmentService.ts
export const getDepartments = async (): Promise<Department[]> => {
    try {
      const store = '673228023ecf7f051ff3dd6d'
      const response = await axiosInstance.get(`departments?store=${store}`)
      console.log(response.data);
      return response.data
      
      
    } catch (error) {
      console.error('Error al obtener:', error);
      throw error;
    }
    
  };


  export const createDepartment = async (_department: Partial<Department>): Promise<Department> => {
    console.log(_department);
    const store = '673228023ecf7f051ff3dd6d'
    try {
       // Combina `store` con los datos del producto
       const departmentData = { ..._department, store };
      const response = await axiosInstance.post('departments',departmentData)
      console.log(response);
      return response.data
      
      
    } catch (error) {
      console.error('Error al obtener:', error);
      throw error;
    }
  };