// src\renderer\features\product\types\departmentTypes.ts
export interface SubDepartment {
  
  name: string;
  managerName?: string;
  status: 'active' | 'inactive';
  description?: string;
}

export interface Department {
  _id: string; // ID generado por MongoDB
  id: string; // Alias para ID, si es necesario
  store: string; // Referencia al ID de la tienda
  name: string; // Nombre del departamento
  description?: string; // Descripción opcional
  code?: string; // Código del departamento
  location?: string; // Ubicación opcional
  managerName?: string; // Nombre del encargado opcional
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'CLOSED'; // Estado del departamento
  subDepartments: SubDepartment[]; // Lista de subdepartamentos
  createdAt?: string; // Fecha de creación
  updatedAt?: string; // Fecha de última actualización
}