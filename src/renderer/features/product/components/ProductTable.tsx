// src\renderer\features\product\components\ProductTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button } from '@mui/material';
import { Product } from '../types/productTypes';

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.pricing.basePrice}</TableCell>
              <TableCell>{product.inventory.stock.current}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => onEdit(product.id)}>Editar</Button>
                <Button color="error" onClick={() => onDelete(product.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
