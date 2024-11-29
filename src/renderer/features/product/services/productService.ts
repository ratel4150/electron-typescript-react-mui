import axios from 'axios';
import { Product } from '../types/productTypes';
import axiosInstance from '../../../api/axiosInstance';

const API_BASE_URL = 'localhost//'

export const getProducts = async (): Promise<Product[]> => {
  try {
    const store = '673228023ecf7f051ff3dd6d'
    const response = await axiosInstance.get(`products?store=${store}`)
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
  
};

export const getProductsByBarCode = async (barcode:string) => {
  try {
   /*  const store = '673228023ecf7f051ff3dd6d' */
    const response = await axiosInstance.get(`products/barcode/${barcode}`)
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
  
};
/* login: async (data: LoginData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    console.log(data);
    
    // Almacena el token si el login fue exitoso
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}, */
export const createProduct = async (_product: Partial<Product>): Promise<Product> => {
  console.log(_product);
  const store = '673228023ecf7f051ff3dd6d'
  try {
     // Combina `store` con los datos del producto
     const productData = { ..._product, store };
    const response = await axiosInstance.post('products',productData)
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    
   
    const response = await axiosInstance.put(`products/${id}`,product)
    console.log(response);
    return response.data
    
    
  } catch (error) {
    console.error('Error al obtener:', error);
    throw error;
  }
  
};
