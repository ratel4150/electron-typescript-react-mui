// src\renderer\features\product\components\ProductFinder.tsx
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImBarcode } from "react-icons/im";

interface ProductFinderProps {
    onSearch: (barCode: string) => void; // Función para manejar la búsqueda
    loading: boolean; // Indicador de carga
    onCancel?: () => void; // Función opcional para cancelar
  }

const ProductFinder: React.FC<ProductFinderProps> = ({ onSearch, loading, onCancel }) => {
    const [barCode, setBarCode] = React.useState<string>("");

    const handleAccept = () => {
      if (barCode.trim()) {
        onSearch(barCode); // Llama a la función con el código de barras
      }
    };
  
    const handleCancel = () => {
      setBarCode(""); // Limpia el campo
      if (onCancel) onCancel(); // Llama a la función de cancelación si existe
    };
  return (
    <Box
    sx={{
      width: 400, // Ancho reducido
      height: 150, // Altura reducida
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
    }}
  >
    <TextField
      label="Escanéa, teclea o busca el Código del Producto"
      variant="outlined"
      size="small" // Tamaño pequeño
      fullWidth
      sx={{ marginBottom: 1 }} // Espaciado más compacto
      value={barCode} // Estado controlado
        onChange={(e) => setBarCode(e.target.value)} // Actualiza el estado
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ImBarcode />
          </InputAdornment>
        ),
      }}
    />
  <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAccept}
          disabled={loading || !barCode.trim()} // Deshabilitado si está cargando o el campo está vacío
        >
          {loading ? "Buscando..." : "Aceptar"}
        </Button>
        <Button variant="outlined" color="secondary" size="small" onClick={handleCancel}>
          Cancelar
        </Button>
      </Stack>
  </Box>
  )
}

export default ProductFinder