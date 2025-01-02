// src\renderer\features\inventory\components\InventoryItemForm.tsx
import React from 'react'
import { InventoryItem } from '../../product/types/inventoryItem';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

interface InventoryItemFormProps{
   type: 'add' | 'update' | 'delete';
    onSubmit: (product: Partial<InventoryItem>) => void;
    initialData?:any;
}

const colorMapping: Record<
  "IN_STOCK" | "OUT_OF_STOCK" | "DAMAGED" | "BACKORDERED" | "PENDING" | "DISCONTINUED",
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  IN_STOCK: "success",
  OUT_OF_STOCK: "error",
  DAMAGED: "error",
  BACKORDERED: "warning",
  PENDING: "info",
  DISCONTINUED: "default",
};

const InventoryItemForm: React.FC<InventoryItemFormProps> = ({type, onSubmit, initialData }) => {

  const [formData, setFormData] = React.useState<Partial<InventoryItem>>({
    ...initialData,
    alertSettings: initialData?.alertSettings || {
      lowStockThreshold: "",
      criticalStockThreshold: "",
      autoReplenish: false,
    },
  });
    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      }
    }, [initialData]);


    console.log(formData);
    


    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handleNestedChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        nestedField: keyof InventoryItem,
        subField: string
      ) => {
        const target = e.target as HTMLInputElement;
        const fieldValue = target.type === "checkbox" ? target.checked : target.value;
      
        setFormData((prev) => ({
          ...prev,
          [nestedField]: {
            ...(prev[nestedField] as Record<string, any> || {}),
            [subField]: fieldValue,
          },
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
          case 'delete':
            onSubmit({ id: formData.id }); // Solo enviar el ID del producto
            break;
          default:
            break;
        }
      };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary' }}>
      {type === 'add' ? 'Crear Producto' : type === 'update' ? 'Actualizar Producto' : 'Eliminar Producto'}
      </Typography>
      <Grid container spacing={2}>
        {/* Información Básica */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre del Producto"
            name="name"
            value={formData.product?.name || ''}
            onChange={(e) => handleNestedChange(e, 'product', 'name')}
            size="small"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Código de Barras"
            name="barcode"
            value={formData.product?.barcode || ''}
            onChange={(e) => handleNestedChange(e, 'product', 'barcode')}
            size="small"
            disabled
          />
        </Grid>

        {/* Configuración de Alertas */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Umbral de Bajo Stock"
            type="number"
            name="lowStockThreshold"
            value={formData.alertSettings?.lowStockThreshold || ''}
            onChange={(e) => handleNestedChange(e, 'alertSettings', 'lowStockThreshold')}
            size="small"
            disabled={type === 'delete'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Umbral Crítico de Stock"
            type="number"
            name="criticalStockThreshold"
            value={formData.alertSettings?.criticalStockThreshold || ''}
            onChange={(e) => handleNestedChange(e, 'alertSettings', 'criticalStockThreshold')}
            size="small"
            disabled={type === 'delete'}
          />
        </Grid>
    {/*     <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
              checked={!!formData.alertSettings?.autoReplenish}
              onChange={(e) => handleNestedChange(e, 'alertSettings', 'autoReplenish')}
              disabled={type === 'delete'}
            />
            }
            label="Reabastecimiento Automático"
          />
        </Grid> */}

        {/* Cantidad y Estado */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cantidad"
            type="number"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            size="small"
            disabled={type === 'delete'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" disabled={type === 'delete'}>
    <InputLabel id="status-select-label">Estado</InputLabel>
    <Select
      labelId="status-select-label"
      name="status"
      value={formData.status || ''}
      onChange={handleChange}
      renderValue={(selected) => (
        <Chip
          label={selected}
          color={colorMapping[selected as keyof typeof colorMapping] || "default"}
        />
      )}
    >
      {[
        "IN_STOCK",
        "OUT_OF_STOCK",
        "DAMAGED",
        "BACKORDERED",
        "PENDING",
        "DISCONTINUED",
      ].map((status) => (
        <MenuItem key={status} value={status}>
          {status.replace(/_/g, " ")}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
        </Grid>

        {/* Niveles de Reabastecimiento */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nivel de Reorden"
            type="number"
            name="reorderLevel"
            value={formData.reorderLevel || ''}
            onChange={handleChange}
            size="small"
            disabled={type === 'delete'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nivel Máximo de Stock"
            type="number"
            name="maxStockLevel"
            value={formData.maxStockLevel || ''}
            onChange={handleChange}
            size="small"
            disabled={type === 'delete'}
          />
        </Grid>

        {/* Prueba  */}
        <Grid item xs={12}>
  <Typography variant="h6" gutterBottom>
    Alert Settings
  </Typography>
  <Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField
    fullWidth
    size="small"
    label="Low Stock Threshold"
    name="lowStockThreshold"
    type="number"
    value={(formData.alertSettings || {})?.lowStockThreshold || ""}
    onChange={(e) => handleNestedChange(e, "alertSettings", "lowStockThreshold")}
  />
</Grid>
<Grid item xs={4}>
          <TextField
          size='small'
            fullWidth
            label="Umbral critico de existencias"
            type="number"
            name='criticalStockThreshold'
            value={(formData.alertSettings || {})?.criticalStockThreshold}
            onChange={(e) => handleNestedChange(e, "alertSettings", "criticalStockThreshold")}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={(formData.alertSettings || {})?.autoReplenish}
                onChange={(e) => handleNestedChange(e, "alertSettings", "autoReplenish")}
              />
            }
            label="Reabastecimiento Automatico"
          />
        </Grid>
   
    
  </Grid>
</Grid>

        <Grid item xs={12}>
      <Typography variant="h6">Price History</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Effective Date</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
              <TableCell><strong>Reason</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.priceHistory?.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.price || "N/A"}</TableCell>
                <TableCell>{entry.effectiveDate ? new Date(entry.effectiveDate).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>{entry.action || "N/A"}</TableCell>
                <TableCell>{entry.reason ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>


        {/* Botón */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color={type === 'delete' ? 'error' : 'primary'}
            onClick={handleSubmit}
          >
            {type === 'add' ? 'Agregar' : type === 'update' ? 'Actualizar' : 'Eliminar'}
          </Button>
        </Grid>
      </Grid>
   
    </Box>
  )
}

export default InventoryItemForm