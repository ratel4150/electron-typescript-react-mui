// src\renderer\api\axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
/*   baseURL: 'http://192.168.1.3:10010', */
baseURL: 'http://localhost:10010',
/*   baseURL: 'https://bpv.onrender.com', */
  timeout: 10000, // Tiempo de espera de 10 segundos,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Obtén el token desde el almacenamiento local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Puedes agregar interceptores aquí si es necesario
// axiosInstance.interceptors.request.use(...);
// axiosInstance.interceptors.response.use(...);

export default axiosInstance;