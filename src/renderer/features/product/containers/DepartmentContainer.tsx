// src\renderer\features\product\containers\DepartmentContainer.tsx
import { Alert, AlertProps, Box, Grid, Paper, Snackbar, Typography } from '@mui/material'
import React from 'react'

import DepartmentForm from '../components/DepartmentForm'
import useDepartment from '../../../hooks/useDepartment'
import TreeDepartment from '../components/TreeDepartment'


const DepartmentContainer = () => {

  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false); 
 
   const {departments,fetchDepartments,addDepartment,error,operationStatus,loading}=useDepartment()
  const handleFormSubmit = (department: any) => {
    setHasSubmitted(true); // Marcar como enviado

    console.log(department);
    
    addDepartment(department); // Llama a la acción para agregar el producto
    fetchDepartments()
  };

  // Este useEffect muestra el mensaje cuando el producto se agrega correctamente
  React.useEffect(() => {
    if (hasSubmitted) {
      if (operationStatus === 'success') {
        setSnackbar({ children: 'Producto agregado correctamente', severity: 'success' });
      } else if (operationStatus === 'failed' && error) {
        setSnackbar({ children: `Error al agregar el producto: ${error}`, severity: 'error' });
      }
    }
  }, [operationStatus, error, hasSubmitted]); // Ahora dependemos de hasSubmitted


  React.useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);


  const handleCloseSnackbar = () => setSnackbar(null);
  
  
  return (
    <Box

    >

      <Grid container spacing={4}>
        {/* Primera columna: TreeDepartmet */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={6} // Sombra más pronunciada
            sx={{
              padding: 3,
              height: '100%',
              borderRadius: 2, // Esquinas redondeadas
              overflowY: 'auto', // Scroll para contenido largo
              backgroundColor: 'background.paper', // Fondo dinámico según el tema
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'medium', mb: 2 }}
            >
              Lista de Departamentos
            </Typography>
            <TreeDepartment   initialDepartments={departments} />
          </Paper>
        </Grid>

        {/* Segunda columna: FormDepartments */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={6} // Sombra más pronunciada
            sx={{
              padding: 3,
              height: '100%',
              borderRadius: 2, // Esquinas redondeadas
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Centrado vertical
              backgroundColor: 'background.paper', // Fondo dinámico según el tema
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'medium', mb: 2 }}
            >
              Formulario de Departamentos
            </Typography>
            <DepartmentForm type='add' onSubmit={handleFormSubmit} />
          </Paper>
        </Grid>
      </Grid>
      {!!snackbar && (
      <Snackbar
        open
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleCloseSnackbar}
        autoHideDuration={2000}
      >
        <Alert {...snackbar} onClose={handleCloseSnackbar} />
      </Snackbar>
    )}
    {loading && <div>Cargando...</div>} {/* Puedes personalizar esto */}
    </Box>
  )
}



export default DepartmentContainer