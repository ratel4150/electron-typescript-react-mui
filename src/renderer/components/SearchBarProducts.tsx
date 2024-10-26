import { Divider, Button, IconButton, InputBase, Paper, Box, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { FaBarcode } from "react-icons/fa";
import { FcAddDatabase } from "react-icons/fc";

function SearchBarProducts() {
    const buttonRef = useRef<HTMLButtonElement | null>(null); // Referencia con tipo específico para el botón

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento por defecto de Enter
        buttonRef.current?.click(); // Simula el clic en el botón si existe
      }
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log("Producto agregado");
    };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '90%', justifyContent: 'center', m: 3 }}>
    {/* Etiqueta en el lado izquierdo */}
    <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 'bold' }}>
      Código del producto:
    </Typography>
    
    {/* Campo de búsqueda */}
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 1200,
      }}
    >
      <IconButton sx={{ p: '10px', color: 'inherit' }} aria-label="search">
        <FaBarcode />
      </IconButton>
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar productos"
        inputProps={{ 'aria-label': 'buscar productos' }}
        onKeyDown={handleKeyDown} // Evento para capturar "Enter"
      />
      
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
      <Button
        ref={buttonRef} // Asigna la referencia al botón
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<FcAddDatabase/>}
        sx={{ p: '10px', minWidth: 180,height:35 }}
      >
      
        Enter - Agregar Producto
      </Button>
    </Paper>
  </Box>
  )
}

export default SearchBarProducts