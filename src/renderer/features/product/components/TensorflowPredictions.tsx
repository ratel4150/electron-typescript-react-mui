// src\renderer\features\product\components\TensorflowPredictions.tsx
import React from 'react'
import { classifyCustomer, detectAnomalies, forecastFinance, predictChurn, predictSales } from '../../../tensor/tensorflowModel';
import { Box, Button, Divider, Typography } from '@mui/material';

const TensorflowPredictions = () => {

    const [salesPredictions, setSalesPredictions] = React.useState<number[]>([]);
    const [customerClassification, setCustomerClassification] = React.useState<string[]>([]);
    const [anomalyDetection, setAnomalyDetection] = React.useState<number[]>([]);
    const [churnPrediction, setChurnPrediction] = React.useState<number[]>([]);
    const [financialForecast, setFinancialForecast] = React.useState<number[]>([]);

   
  const handlePredictSales = async () => {
    const input = [
        [1, 100, 10, 5, 0.5],  // 5 características por muestra
        [2, 200, 15, 10, 0.3]
    ];
    const results = await predictSales(input);
    setSalesPredictions(results);
  };

  const handleClassifyCustomer = async () => {
    const input = [
      [400, 3, 2, 15],
      [50, 1, 1, 60],
    ];
  
    try {
      const results = await classifyCustomer(input) as number[][];
      console.log(results);
  
      const labels = results.map((res) => {
        const [frequent, occasional, newCustomer] = res;
        if (frequent > occasional && frequent > newCustomer) return 'Frecuente';
        if (occasional > frequent && occasional > newCustomer) return 'Ocasional';
        return 'Nuevo';
      });
  
      setCustomerClassification(labels);
    } catch (error) {
      console.error('Error clasificando clientes:', error);
    }
  };

  const handleDetectAnomalies = async () => {
    const input = [
      [6, 700], // Anomalía
      [7, 100], // No anomalía
    ];
    const results = await detectAnomalies(input);
    setAnomalyDetection(results);
  };

  const handlePredictChurn = async () => {
    const input = [
      [15, 1, 0.6, 3.5],
      [30, 0, 0.3, 1.8],
    ];
    const results = await predictChurn(input);
    setChurnPrediction(results.map((prob) => Math.round(prob))); // 0 o 1
  };

  const handleForecastFinance = async () => {
    const input = [
      [4], // Trimestre 4
      [5], // Trimestre 5
    ];
    const results = await forecastFinance(input);
    setFinancialForecast(results);
  };
  return (
    <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Predicciones con TensorFlow.js
      </Typography>

      {/* Predicción de Ventas */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Predicción de Ventas
      </Typography>
      {salesPredictions.length > 0 ? (
        <Box>
          {salesPredictions.map((pred, index) => (
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
      <Button variant="contained" color="primary" onClick={handlePredictSales} sx={{ marginTop: 2 }}>
        Predecir Ventas
      </Button>
      
      <Divider sx={{ marginY: 3 }} />

      {/* Clasificación de Clientes */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Clasificación de Clientes
      </Typography>
      {customerClassification.length > 0 ? (
        <Box>
          {customerClassification.map((label, index) => (
            <Typography key={index}>Cliente {index + 1}: {label}</Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Clasifica clientes en Frecuente, Ocasional o Nuevo.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleClassifyCustomer} sx={{ marginTop: 2 }}>
        Clasificar Clientes
      </Button>

      <Divider sx={{ marginY: 3 }} />

      {/* Detección de Anomalías */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Detección de Anomalías
      </Typography>
      {anomalyDetection.length > 0 ? (
        <Box>
          {anomalyDetection.map((anomaly, index) => (
            <Typography key={index}>
              Entrada {index + 1}: {anomaly > 0.5 ? 'Anomalía detectada' : 'Sin anomalía'}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Detecta anomalías en los datos de ventas.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleDetectAnomalies} sx={{ marginTop: 2 }}>
        Detectar Anomalías
      </Button>

      <Divider sx={{ marginY: 3 }} />

      {/* Predicción de Churn */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Predicción de Churn
      </Typography>
      {churnPrediction.length > 0 ? (
        <Box>
          {churnPrediction.map((churn, index) => (
            <Typography key={index}>
              Cliente {index + 1}: {churn ? 'Podría abandonar' : 'Permanecerá'}
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Predice la probabilidad de pérdida de clientes.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handlePredictChurn} sx={{ marginTop: 2 }}>
        Predecir Churn
      </Button>

      <Divider sx={{ marginY: 3 }} />

      {/* Previsión Financiera */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        Previsión Financiera
      </Typography>
      {financialForecast.length > 0 ? (
        <Box>
          {financialForecast.map((forecast, index) => (
            <Typography key={index}>
              Trimestre {index + 4}: ${Math.round(forecast)} ingresos proyectados
            </Typography>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Previsión de ingresos trimestrales futuros.
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleForecastFinance} sx={{ marginTop: 2 }}>
        Prever Finanzas
      </Button>
    </Box>
  )
}

export default TensorflowPredictions