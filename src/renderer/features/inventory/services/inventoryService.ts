// src\renderer\features\inventory\services\inventoryService.ts
import axiosInstance from "../../../api/axiosInstance";
import { InventoryItem } from "../../product/types/inventoryItem";

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


export const createInventoryItem = async (_inventoryItem: Partial<InventoryItem>): Promise<InventoryItem> => {
  console.log(_inventoryItem);
  const store = '673228023ecf7f051ff3dd6d'
  try {
     // Combina `store` con los datos del producto
     const inventoryItemData = { ..._inventoryItem, store };
    const response = await axiosInstance.post('inventory',inventoryItemData)
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
};


export const updateInventoryItem = async ( _inventoryItem: Partial<InventoryItem>): Promise<InventoryItem> => {
  try {
    

    const response = await axiosInstance.put(`inventory/${_inventoryItem._id}`, _inventoryItem);
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
  
};
export const getInventoryItembyBarCode = async (barcode: any) => {
  let response;

  try {
    console.log(`Iniciando solicitud para el código de barras: ${barcode}`);
    response = await axiosInstance.get(`inventory/barcode/${barcode}`);
    console.log('Respuesta recibida:', response);

    // Procesamiento adicional si es necesario
    if (!response.data || response.status !== 200) {
      throw new Error('Datos inválidos o respuesta no exitosa');
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto por código de barras:', error);

    // Opcional: registrar el error en un sistema de monitoreo externo
    logErrorToMonitoringService(error);

    throw error; // Re-lanza el error para que sea manejado externamente
  } finally {
    console.log('Finalizando la operación para el código de barras:', barcode);

    // Limpieza de recursos o ejecución de operaciones post-procesamiento
    cleanupAfterRequest();
  }
};

// Función ficticia para log de errores
const logErrorToMonitoringService = (error: any) => {
  console.log('Registrando error en el sistema de monitoreo:', error.message);
};

// Función ficticia para limpieza
const cleanupAfterRequest = () => {
  console.log('Limpieza post-solicitud completada');
};
