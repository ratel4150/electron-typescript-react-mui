// src\renderer\features\product\components\ProductDataTable.tsx
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const ProductDataTable = () => {

    const rows = [
        { id: 1, name: 'Producto A', sales: 120, stock: 50 },
        { id: 2, name: 'Producto B', sales: 150, stock: 30 },
        { id: 3, name: 'Producto C', sales: 100, stock: 70 },
      ];

      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Producto', width: 150 },
        { field: 'sales', headerName: 'Ventas', width: 110 },
        { field: 'stock', headerName: 'Stock', width: 110 },
      ];
    
      return <DataGrid rows={rows} columns={columns} autoHeight />;
}

export default ProductDataTable