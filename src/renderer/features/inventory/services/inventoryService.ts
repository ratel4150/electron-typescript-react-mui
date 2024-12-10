// src\renderer\features\inventory\services\inventoryService.ts
import axiosInstance from "../../../api/axiosInstance";

// src\renderer\features\inventory\services\inventoryService.ts
export const getAllInventoryItems =async():Promise<any>=>{

    try {
        const store = '673228023ecf7f051ff3dd6d'
        const response = await axiosInstance.get(`inventory`)
        console.log(response.data);
        return response.data
        
        
      } catch (error) {
        console.error('Error al obtener:', error);
        throw error;
      }


}