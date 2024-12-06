// src\renderer\features\product\containers\ReportProductContainer.tsx
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductFilters from '../components/ProductFilters'
import SummaryCards from '../components/SummaryCards'
import ProductChart from '../components/ProductChart'
import ProductDataTable from '../components/ProductDataTable'
import ExportButtons from '../components/ExportButtons'
import SalesPredictionChart from '../components/SalesPredictionChart'
import TensorflowPredictions from '../components/TensorflowPredictions'

const ReportProductContainer = () => {
  const [isModelLoaded, setModelLoaded] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  


  React.useEffect(() => {
    const loadTensorflowModels = async () => {
      try {
        const { initializeModels } = await import('../../../tensor/tensorflowModel');
        const modelsToInitialize = ['AnomalyDetection', 'Churn','CustomerClassification','FinancialForecast','Sales'];
        const initializedModels = await initializeModels(modelsToInitialize);
  
        console.log('Initialized Models:', initializedModels);
        setModelLoaded(true);
      } catch (error) {
        setLoadError('Error cargando los modelos de predicción.');
        console.error('Error al cargar los modelos de TensorFlow:', error);
      }
    };
  
    loadTensorflowModels();
  }, []);
  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        Reportes de Productos
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', marginBottom: 2 }}
      >
        Obtén información detallada sobre el rendimiento de tus productos, identifica tendencias y toma decisiones basadas en datos.
      </Typography>

      {/* Filtros */}
      <ProductFilters />

      {/* Resumen */}
      <SummaryCards />

      {/* Gráficos y Análisis */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={8}>
          <ProductChart />
        </Grid>
     {/*    <Grid item xs={12} md={4}>
          <InsightsSection />
        </Grid> */}
      </Grid>

      {/* Tendencias */}
     {/*  <Box sx={{ marginTop: 4 }}>
        <ProductTrends />
      </Box> */}

   {/* Predicciones de TensorFlow */}
   <Box sx={{ marginTop: 4 }}>
        {isModelLoaded ? (
          <TensorflowPredictions />
        ) : loadError ? (
          <Typography sx={{ color: 'error.main', textAlign: 'center' }}>
            {loadError}
          </Typography>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
            <Typography>Cargando modelo de predicción...</Typography>
          </Box>
        )}
      </Box>

      {/* Tabla de Datos */}
      <Box sx={{ marginTop: 4 }}>
        <ProductDataTable />
      </Box>

      {/* Exportar Datos */}
      <Box sx={{ marginTop: 4, textAlign: 'right' }}>
        <ExportButtons />
      </Box>
    </Box>
  );
}

export default ReportProductContainer