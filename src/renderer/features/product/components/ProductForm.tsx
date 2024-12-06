// src\renderer\features\product\components\ProductForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, MenuItem, FormControlLabel, Checkbox, AlertProps, Snackbar, Alert } from '@mui/material';
import { Product } from '../types/productTypes';

interface ProductFormProps {
  type: 'add' | 'update' | 'delete';
  onSubmit: (product: Partial<Product>) => void;
  initialData?: Partial<Product>;
}

const ProductForm: React.FC<ProductFormProps> = ({type, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {});
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);




  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
    arrayField: keyof Product,
    index: number,
    subField: string,
    inputType: 'text' | 'checkbox' = 'text'
  ) => {
    const value = inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
  
    setFormData((prev) => {
      const currentArray = (prev[arrayField] as Array<Record<string, any>> || []).slice(); // Copiar el array
      const targetItem = { ...currentArray[index], [subField]: value }; // Actualizar el campo específico
      currentArray[index] = targetItem;
  
      return {
        ...prev,
        [arrayField]: currentArray,
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nestedField: keyof Product,
    subField: string
  ) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [nestedField]: {
        ...(prev[nestedField] as Record<string, any> || {}), // Aseguramos que sea un objeto
        [subField]: value,
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
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
      {type === 'add' ? 'Crear Producto' : type === 'update' ? 'Actualizar Producto' : 'Eliminar Producto'}
      </Typography>
      <Grid container spacing={2}>
        {/* Información Básica */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre del Producto"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            size="small"
            disabled={type === 'delete'} // Desactivar campos en modo delete
            required={type === 'add'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SKU"
            name="sku"
            value={formData.sku || ''}
            onChange={handleChange}
            size="small"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Código de Barras"
            name="barcode"
            value={formData.barcode || ''}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descripción"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Estado"
            name="status"
            value={formData.status || 'ACTIVE'}
            onChange={handleChange}
            size="small"
          >
            {['ACTIVE', 'INACTIVE', 'DISCONTINUED', 'PENDING_APPROVAL', 'REJECTED'].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/* Dimensiones */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Dimensiones
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Peso"
            name="weight"
            type="number"
            value={formData.dimensions?.weight || ''}
            onChange={(e) => handleNestedChange(e, 'dimensions', 'weight')}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Altura"
            name="height"
            type="number"
            value={formData.dimensions?.height || ''}
            onChange={(e) => handleNestedChange(e, 'dimensions', 'height')}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Anchura"
            name="width"
            type="number"
            value={formData.dimensions?.width || ''}
            onChange={(e) => handleNestedChange(e, 'dimensions', 'width')}
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Largo"
            name="length"
            type="number"
            value={formData.dimensions?.length || ''}
            onChange={(e) => handleNestedChange(e, 'dimensions', 'length')}
            size="small"
          />
        </Grid>


        <Grid item xs={3}>
          <TextField
            fullWidth
            select
            label="Unidad de Medida"
            name="unitOfMeasure"
            value={formData.dimensions?.unitOfMeasure || ''}
            onChange={(e) => handleNestedChange(e, 'dimensions', 'unitOfMeasure')}
            size="small"
          >
            {['KG', 'G', 'L', 'ML', 'UNIT'].map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Precios */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Precios
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Precio Base"
            name="basePrice"
            type="number"
            value={formData.pricing?.basePrice || ''}
            onChange={(e) => handleNestedChange(e, 'pricing', 'basePrice')}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Precio de Venta"
            name="sellingPrice"
            type="number"
            value={formData.pricing?.sellingPrice || ''}
            onChange={(e) => handleNestedChange(e, 'pricing', 'sellingPrice')}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Precio Mayorista"
            name="wholesalePrice"
            type="number"
            value={formData.pricing?.wholesalePrice || ''}
            onChange={(e) => handleNestedChange(e, 'pricing', 'wholesalePrice')}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Markup"
            name="markup"
            type="number"
            value={formData.pricing?.markup || ''}
            onChange={(e) => handleNestedChange(e, 'pricing', 'markup')}
            size="small"
          />
        </Grid>

        {/* Impuestos */}
        {formData.pricing?.taxes?.map((tax, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tipo de Impuesto"
                value={tax.type}
                size="small"
                onChange={(e) => handleNestedChange(e, 'pricing', `taxes[${index}].type`)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tasa de Impuesto"
                type="number"
                value={tax.rate}
                size="small"
                onChange={(e) => handleNestedChange(e, 'pricing', `taxes[${index}].rate`)}
              />
            </Grid>
          </Grid>
        ))}
        {/* Descuentos */}
        {formData.pricing?.discounts?.map((discount, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tipo de Descuento"
                value={discount.type || ''}
                onChange={(e) => handleNestedChange(e, 'pricing', `discounts[${index}].type`)}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Valor del Descuento"
                type="number"
                value={discount.value || ''}
                onChange={(e) => handleNestedChange(e, 'pricing', `discounts[${index}].value`)}
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Condiciones"
                value={discount.conditions || ''}
                onChange={(e) => handleNestedChange(e, 'pricing', `discounts[${index}].conditions`)}
                size="small"
              />
            </Grid>
          </Grid>
        ))}

        {/* Images */}
<Grid item xs={12}>
  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    Imágenes
  </Typography>
</Grid>
<Grid item xs={4}>
  <TextField
    fullWidth
    label="URL de la Imagen"
    name="imageUrl"
    value={formData.images?.[0]?.url || ''}
    onChange={(e) => handleArrayChange(e, 'images', 0, 'url')}
    size="small"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    fullWidth
    label="Texto Alternativo"
    name="altText"
    value={formData.images?.[0]?.altText || ''}
    onChange={(e) => handleArrayChange(e, 'images', 0, 'altText')}
    size="small"
  />
</Grid>
<Grid item xs={4}>
  <FormControlLabel
    control={
      <Checkbox
        checked={formData.images?.[0]?.isPrimary || false}
        onChange={(e) => handleArrayChange(e, 'images', 0, 'isPrimary', 'checkbox')}
      />
    }
    label="Principal"
  />
</Grid>

{/* Videos */}
<Grid item xs={12}>
  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    Videos
  </Typography>
</Grid>
<Grid item xs={6}>
  <TextField
    fullWidth
    label="URL del Video"
    name="videoUrl"
    value={formData.videos?.[0]?.url || ''}
    onChange={(e) => handleArrayChange(e, 'videos', 0, 'url')}
    size="small"
  />
</Grid>
<Grid item xs={6}>
  <TextField
    fullWidth
    label="Descripción del Video"
    name="videoDescription"
    value={formData.videos?.[0]?.description || ''}
    onChange={(e) => handleArrayChange(e, 'videos', 0, 'description')}
    size="small"
  />
</Grid>

{/* Documents */}
<Grid item xs={12}>
  <Typography variant="subtitle1" sx={{ mt: 2 }}>
    Documentos
  </Typography>
</Grid>
<Grid item xs={4}>
  <TextField
    fullWidth
    select
    label="Tipo de Documento"
    name="documentType"
    value={formData.documents?.[0]?.type || ''}
    onChange={(e) => handleArrayChange(e, 'documents', 0, 'type')}
    size="small"
  >
    {['MANUAL', 'DATASHEET', 'WARRANTY'].map((type) => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
</Grid>
<Grid item xs={4}>
  <TextField
    fullWidth
    label="URL del Documento"
    name="documentUrl"
    value={formData.documents?.[0]?.url || ''}
    onChange={(e) => handleArrayChange(e, 'documents', 0, 'url')}
    size="small"
  />
</Grid>



        {/* SEO */}

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            SEO
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Meta Título"
            name="metaTitle"
            value={formData.seo?.metaTitle || ''}
            onChange={(e) => handleNestedChange(e, 'seo', 'metaTitle')}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Meta Descripción"
            name="metaDescription"
            value={formData.seo?.metaDescription || ''}
            onChange={(e) => handleNestedChange(e, 'seo', 'metaDescription')}
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Slug"
            name="slug"
            value={formData.seo?.slug || ''}
            onChange={(e) => handleNestedChange(e, 'seo', 'slug')}
            size="small"
          />
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
  );
};

export default ProductForm;
