// src\renderer\features\product\components\TensorflowPredictions.tsx
import React from 'react'
import { predictSales } from '../../../tensor/tensorflowModel';
import { Box, Button, Typography } from '@mui/material';

const TensorflowPredictions = () => {

    const [predictions, setPredictions] = React.useState<number[]>([]);

    const handlePredict = async () => {
        const input = [
          [4, 400], // Día 4, 400 ventas simuladas
          [5, 500], // Día 5, 500 ventas simuladas
        ];
        const results = await predictSales(input);
        setPredictions(results);
      };
  return (
    <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
      Predicción de Ventas con TensorFlow.js
    </Typography>
    {predictions.length > 0 ? (
      <Box>
        {predictions.map((pred, index) => (
          <Typography key={index}>
            Día {index + 4}: {Math.round(pred)} ventas predichas
          </Typography>
        ))}
      </Box>
    ) : (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Haz clic en el botón para predecir las ventas futuras basadas en datos históricos.
      </Typography>
    )}
    <Button variant="contained" color="primary" onClick={handlePredict} sx={{ marginTop: 2 }}>
      Predecir Ventas
    </Button>
  </Box>
  )
}

export default TensorflowPredictions