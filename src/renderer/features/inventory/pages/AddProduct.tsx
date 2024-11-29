import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  InputAdornment,
} from "@mui/material";

const categories = [
  { value: "bebidas", label: "Bebidas" },
  { value: "alimentos", label: "Alimentos" },
  { value: "limpieza", label: "Productos de Limpieza" },
  { value: "otros", label: "Otros" },
];

function AddProduct() {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Nuevo Producto
      </Typography>

      {/* Formulario */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Grid container spacing={2}>
          {/* Campo: Nombre del Producto */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Nombre del Producto"
              variant="outlined"
              required
            />
          </Grid>

          {/* Campo: Código de Barras */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Código de Barras"
              variant="outlined"
              required
            />
          </Grid>

          {/* Campo: SKU */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="SKU (Unidad de Gestión de Stock)"
              variant="outlined"
            />
          </Grid>

          {/* Campo: Precio */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Precio de Venta"
              variant="outlined"
              type="number"
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>

          {/* Campo: Precio de Compra */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Precio de Compra"
              variant="outlined"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>

          {/* Campo: Cantidad */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Cantidad"
              variant="outlined"
              type="number"
              required
            />
          </Grid>

          {/* Campo: Categoría */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              select
              label="Categoría"
              variant="outlined"
              defaultValue=""
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Campo: Unidad de Medida */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Unidad de Medida (Ej: kg, litros, unidades)"
              variant="outlined"
              required
            />
          </Grid>

          {/* Campo: Descripción */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Descripción (Opcional)"
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>

          {/* Botón: Guardar */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 1,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Registrar Producto
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AddProduct;
