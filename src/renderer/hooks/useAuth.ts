import React, { ReactNode, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// Definición de tipos para los datos del usuario
interface AuthContextType {
  user: string | null;
  token: string | null;
  roles: string[]; // Ajusta este tipo si roles tiene más estructura
  id: string | null;
  menus: any[]; // Cambia `any[]` por el tipo específico si sabes la estructura de los menús
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

// Tipos para las credenciales y la respuesta del login
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  token: string;
  roles: string[];
  id: string;
  menus: any[]; // Cambia `any[]` si tienes una estructura específica para menús
}

// Crear el contexto
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<string>("user", null);
  const [token, setToken] = useLocalStorage<string>("token", null);
  const [roles, setRoles] = useLocalStorage<string[]>("roles", []);
  const [id, setId] = useLocalStorage<string>("id", null);
  const [menus, setMenus] = useLocalStorage<any[]>("menus", []); // Ajustar tipo de `menus` si es necesario

  const navigate = useNavigate();

  // Interceptor de Axios para manejar la expiración del token
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Si el servidor responde con un 401, se considera que el token ha expirado
        logout();
        navigate("/", { replace: true });
      }
      return Promise.reject(error);
    }
  );

  // Función de login
  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const data = await login(credentials);
      console.log(data);

      setUser(data.username);
      setToken(data.token);
      setRoles(data.roles);
      setId(data.id);
      setMenus(data.menus);

      navigate("/dashboard");
      return data;
    } catch (error: any) {
      throw error.response?.data || "Error desconocido";
    }
  };

  // Función de logout
  const logout = async (): Promise<void> => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(null);
      setToken(null);
      setRoles([]);
      setId(null);
      setMenus([]);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Memorizar el valor del contexto
  const value = useMemo(
    () => ({
      user,
      token,
      roles,
      id,
      menus,
      login,
      logout,
    }),
    [user, token, roles, id, menus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
