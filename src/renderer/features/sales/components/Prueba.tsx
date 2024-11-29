import React from 'react'
import axiosInstance from '../../../api/axiosInstance';
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  avatar: string; // Nueva propiedad para la URL del avatar
  createdAt: string; // Nueva propiedad para la fecha de creación
}

function Prueba() {
    const [data, setData] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get<Item[]>('/');
            setData(response.data);
          } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
              setError(err.response.data);
            } else {
              console.log("errror");
              
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) {
        return <div>Cargando...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      return (
        <div>
          <h1>Datos de la API</h1>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <img src={item.avatar} alt={item.name} style={{ width: 50, height: 50 }} />
                <div>
                  <strong>{item.name}</strong>
                  <p>Creado en: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    
}

export default Prueba