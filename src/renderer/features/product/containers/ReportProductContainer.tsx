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
  


  React.useEffect(() => {
    const loadTensorflowModel = async () => {
      const model = await import('../../../tensor/tensorflowModel'); // Carga dinámica
      await model.initialize(); // Inicializa el modelo de TensorFlow
      setModelLoaded(true);
    };
    loadTensorflowModel();
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
        {/* <Grid item xs={12} md={4}>
          <InsightsSection />
        </Grid> */}
      </Grid>

      {/* Tendencias */}
     {/*  <Box sx={{ marginTop: 4 }}>
        <ProductTrends />
      </Box> */}

      {/* TensorFlow Predictions */}
      <Box sx={{ marginTop: 4 }}>
        {isModelLoaded ? (
          <TensorflowPredictions />
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