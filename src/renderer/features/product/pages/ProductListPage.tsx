// src\renderer\features\product\pages\ProductListPage.tsx
import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Grid, Avatar, AvatarGroup } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridToolbar } from '@mui/x-data-grid';
import useProduct from '../../../hooks/useProduct';



import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { PieChart } from '@mui/x-charts';
// Definición de columnas para DataGrid



const AvatarImage = ({ data }: any) => {
  // Asegúrate de que `data` es un array y extrae las URLs
  const imageUrls =
    Array.isArray(data) && data.length > 0
      ? data.map((item: any) => item.url).filter((url: string) => url)
      : [];

  console.log(imageUrls);

  return (
    <AvatarGroup max={4}>
      {imageUrls.map((url: string, index: number) => (
        <Avatar key={index} alt={`Image ${index + 1}`} src={url} />
      ))}
    </AvatarGroup>
  );
};



function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'sku', headerName: 'SKU', width: 200 },
  { field: 'barcode', headerName: 'Código de Barras', width: 180 },
  { field: 'images', headerName: 'Imágenes', width: 200, editable: true, renderCell: (params) => {

    console.log(params);
    

   return (<AvatarImage data={params.row.images} />)

  } },
  { field: 'categories', headerName: 'Categoría', width: 150 },
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
    products,
    loading,
    error,
    fetchProducts,

  } = useProduct();
  const [progress, setProgress] = useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 6,
  });

  /*  const fetchProducts = async () => {
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
 
  */
  React.useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            clearInterval(interval);
            return prev;
          }
          return Math.min(prev + 10, 100);
        });
      }, 500);
    } else {
      setProgress(100);
    }
  }, [loading]);



  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products)
  if (loading) {
    return (
      <Box
        sx={{
          padding: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgressWithLabel value={progress} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


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
          <Button variant="contained" color="primary" size="small">
            Agregar Producto
          </Button>
        </Grid>
      </Grid>


      <Box sx={{ maxHeight: 230, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id}
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
    </Box>
  );

};

export default ProductListPage;
