// src\renderer\features\product\components\ExportButtons.tsx
import { Box, Button } from '@mui/material';
import React from 'react'

const ExportButtons = () => {

    const handleExport = (format: string) => {
        console.log(`Exportando en formato ${format}`);
      };
    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleExport('PDF')}
        sx={{ marginRight: 2 }}
      >
        Exportar PDF
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleExport('Excel')}>
        Exportar Excel
      </Button>
    </Box>
  )
}

export default ExportButtons