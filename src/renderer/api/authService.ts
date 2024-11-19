import axiosInstance from "./axiosInstance";

export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }

  


  const authService = {
    /**
     * Login del usuario
     * @param {LoginData} data - Credenciales de inicio de sesión
     * @returns {Promise<any>}
     */
    login: async (data: LoginData): Promise<any> => {
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
    },
  
    /**
     * Registro de usuario
     * @param {RegisterData} data - Datos de registro
     * @returns {Promise<any>}
     */
    register: async (data: RegisterData): Promise<any> => {
      try {
        const response = await axiosInstance.post('/auth/register', data);
        return response.data;
      } catch (error) {
        console.error('Error en register:', error);
        throw error;
      }
    },
  
    /**
     * Logout del usuario
     * @returns {Promise<void>}
     */
    logout: async (): Promise<void> => {
      try {
        const response = await axiosInstance.post('/auth/logout');
        // Limpia el token del almacenamiento local
        localStorage.removeItem('authToken');
        return response.data;
      } catch (error) {
        console.error('Error en logout:', error);
        throw error;
      }
    },
  
    /**
     * Verificar el estado de autenticación
     * @returns {Promise<boolean>} - True si el token es válido
     */
    checkAuth: async (): Promise<boolean> => {
      try {
        const response = await axiosInstance.get('/auth/check');
        return response.data.isAuthenticated;
      } catch (error) {
        console.error('Error en checkAuth:', error);
        return false;
      }
    },
  };
  
  export default authService;

  