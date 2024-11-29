import React from 'react';
import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridToolbar } from '@mui/x-data-grid';
import { Product } from '../types/productTypes';
import { getProducts } from '../services/productService';
import { useProduct } from '../hook/useProduct';


// Definición de columnas para DataGrid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'sku', headerName: 'SKU', width: 200 },
  { field: 'barcode', headerName: 'Código de Barras', width: 180 },
  { field: 'category', headerName: 'Categoría', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 100, type: 'number' },
  {
    field: 'sellingPrice',
    headerName: 'Precio de Venta',
    width: 150,
    type: 'number',
    valueFormatter: (params: any) => {
   
      return params
    }, // Formato de moneda
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 150,
    renderCell: (params) => {
      let color;

      switch (params.value) {
        case 'ACTIVE':
          color = 'green';
          break;
        case 'DISCONTINUED':
          color = 'red';
          break;
        case 'PENDING_APPROVAL':
          color = 'orange';
          break;
        default:
          color = 'gray';
          break;
      }

      return (
        <span
          style={{
            color,
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </span>
      );
    }
  },
];

const ProductListPage: React.FC = () => {
  const {
    products, // Estado global de productos
    setProduct, // Setter global para productos
    loading, // Estado de carga
    error, // Estado de error
    needsFetch, // Necesita hacer fetch?
  } = useProduct();


  console.log(products);
  
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 6,
  });
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      // Convertir _id a id
      const formattedData = data.map((item: any) => ({
        ...item,
        id: item._id, // Mapea _id a id
      }));
      setProduct(formattedData); // Establece los productos en el estado global
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };



  React.useEffect(() => {
    if (needsFetch) {
      fetchProducts();
    }



  }, [setProduct, needsFetch]);

  return (
    <Box sx={{ padding: 3, backgroundColor: 'background.default' }}>
  <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
    <Grid item>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Listado de Productos
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Gestión de los productos registrados en el sistema.
      </Typography>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        size="small"
        /*  onClick={() =>
              setProduct({
                id: '4',
                name: 'Teclado Mecánico',
                sku: 'MK-01',
                barcode: '111222333444',
                category: 'Accesorios',
                stock: 20,
                sellingPrice: 80.0,
                status: 'ACTIVE',
              })
            } */
      >
        Agregar Producto
      </Button>
    </Grid>
  </Grid>

  {loading ? (
    <Typography variant="body1">Cargando productos...</Typography>
  ) : error ? (
    <Typography variant="body1" color="error">
      Error al cargar productos: {error}
    </Typography>
  ) : (
    <Box sx={{ maxHeight: 230, width: '100%' }}>
      <DataGrid
        initialState={{
          filter: {
            filterModel: {
              items: [],
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        rows={products}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.light',
            color: 'gray',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '0.8rem',
          },
        }}
      />
    </Box>
  )}
</Box>
  );
};

export default ProductListPage;
