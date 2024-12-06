// src\renderer\features\product\components\DepartmentForm.tsx
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react'
import { Department } from '../types/departmentTypes';


interface DepartmentFormProps {
    type: 'add' | 'update' | 'delete';
    onSubmit: (department: Partial<Department>) => void;
    initialData?: Partial<Department>;
  }



  const DepartmentForm: React.FC<DepartmentFormProps> = ({
    type,
    onSubmit,
    initialData = {},
  }) => {
    const [formData, setFormData] = React.useState(
      {
        name: initialData.name || '',
        store: initialData.store || '',
        description: initialData.description || '',
        code: initialData.code || '',
        location: initialData.location || '',
        managerName: initialData.managerName || '',
        status: initialData.status || 'ACTIVE',
        subDepartments: initialData.subDepartments || [],
      }
    );


    const handleSubDepartmentChange = (index:any, field:any, value:any) => {
      const updatedSubDepartments = [...formData.subDepartments];
      updatedSubDepartments[index] = {
        ...updatedSubDepartments[index],
        [field]: value,
      };
      setFormData((prev) => ({
        ...prev,
        subDepartments: updatedSubDepartments,
      }));
    };


    const addSubDepartment = () => {
      setFormData((prev) => ({
        ...prev,
        subDepartments: [...prev.subDepartments, { name: '', managerName: '', status: 'active', description: '' }],
      }));
    };
  
    const removeSubDepartment = (index:any) => {
      setFormData((prev) => ({
        ...prev,
        subDepartments: prev.subDepartments.filter((_, i) => i !== index),
      }));
    };



    

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSubmit = () => {
    switch (type) {
      case 'add':
        onSubmit(formData); // Validar los campos requeridos antes de enviar
        break;
      case 'update':
        onSubmit({ ...initialData, ...formData }); // Asegurar que se envíen cambios específicos
        break;
     /*  case 'delete':
        onSubmit({ id: formData.id }); // Solo enviar el ID del producto
        break; */
      default:
        break;
    }
  };



  return (<Box component="form"  sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Nombre del Departamento"
          name="name"
          value={formData.name}
          onChange={handleChange}
          size="small"
        />
      </Grid>
   {/*    <Grid item xs={12} sm={6}>
        <TextField
          select
          required
          fullWidth
          label="Tienda"
          name="store"
          value={formData.store}
          onChange={handleChange}
          size="small"
        >
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid> */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Código"
          name="code"
          value={formData.code}
          onChange={handleChange}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Ubicación"
          name="location"
          value={formData.location}
          onChange={handleChange}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Nombre del Gerente"
          name="managerName"
          value={formData.managerName}
          onChange={handleChange}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          fullWidth
          label="Estado"
          name="status"
          value={formData.status}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="ACTIVE">Activo</MenuItem>
          <MenuItem value="INACTIVE">Inactivo</MenuItem>
          <MenuItem value="PENDING">Pendiente</MenuItem>
          <MenuItem value="CLOSED">Cerrado</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Subdepartamentos
        </Typography>
        {formData.subDepartments.map((sub, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nombre del Subdepartamento"
                  value={sub.name}
                  onChange={(e) =>
                    handleSubDepartmentChange(index, 'name', e.target.value)
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nombre del Gerente"
                  value={sub.managerName}
                  onChange={(e) =>
                    handleSubDepartmentChange(index, 'managerName', e.target.value)
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  value={sub.status}
                  onChange={(e) =>
                    handleSubDepartmentChange(index, 'status', e.target.value)
                  }
                  size="small"
                >
                  <MenuItem value="active">Activo</MenuItem>
                  <MenuItem value="inactive">Inactivo</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeSubDepartment(index)}
                >
                  Eliminar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  value={sub.description}
                  onChange={(e) =>
                    handleSubDepartmentChange(index, 'description', e.target.value)
                  }
                  multiline
                  rows={2}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Button variant="outlined" onClick={addSubDepartment}>
          Añadir Subdepartamento
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button  onClick={handleSubmit} variant="contained" color="primary" fullWidth>
          Guardar
        </Button>
      </Grid>
    </Grid>
  </Box>
  )







  }






  


  
  


export default DepartmentForm