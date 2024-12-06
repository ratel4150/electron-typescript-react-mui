// src\renderer\features\product\containers\UpdateProductContainer.tsx
import React, { useState } from "react";
import ProductFinder from "../components/ProductFinder";
import { getProductsByBarCode } from "../services/productService";
import { Product } from "../types/productTypes";
import {
  Alert,
  AlertProps,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import ProductForm from "../components/ProductForm";
import useProduct from "../../../hooks/useProduct";

const UpdateProductContainer: React.FC = () => {
  const { updateProduct, products, loading, error: updateError } = useProduct();
  const [product, setProduct] = useState<Product | null>(null); // Producto a editar
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false); // Estado de carga para búsqueda
  const [searchError, setSearchError] = useState<string | null>(null); // Error en búsqueda
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, "children" | "severity"> | null>(null);

  const handleSearch = async (barCode: string) => {
    setLoadingSearch(true);
    setSearchError(null);
    setProduct(null);

    try {
      const productData = await getProductsByBarCode(barCode);
      setProduct(productData);
    } catch (err) {
      setSearchError("No se pudo encontrar el producto. Verifica el código de barras.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleCancel = () => {
    setSearchError(null);
    setProduct(null);
  };

  const handleFormSubmit = (updatedProduct: Partial<Product>) => {
    if (!updatedProduct._id) {
      setSnackbar({ children: "El producto no tiene un ID válido.", severity: "error" });
      return;
    }

    updateProduct(updatedProduct as Product); // Llama a la función del hook

    setSnackbar({ children: "Producto actualizado correctamente.", severity: "success" });
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  React.useEffect(() => {
    // Mostrar errores del hook en el Snackbar
    if (updateError) {
      setSnackbar({ children: updateError, severity: "error" });
    }
  }, [updateError]);

  return (
    <Box sx={{ padding: 2 }}>
      <ProductFinder
        onSearch={handleSearch} // Búsqueda del producto
        loading={loadingSearch} // Indicador de carga para búsqueda
        onCancel={handleCancel} // Restablecer búsqueda
      />
      {searchError && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {searchError}
        </Typography>
      )}

      {product && (
        <ProductForm
          type="update"
          onSubmit={handleFormSubmit}
          initialData={product}
        />
      )}

      {/* Mostrar un mensaje cuando no hay producto ni error */}
      {!product && !searchError && !loadingSearch && (
        <Typography sx={{ marginTop: 2 }}>
          Por favor, busca un producto utilizando el código de barras.
        </Typography>
      )}

      {/* Mostrar indicador de carga durante la operación de actualización */}
      {loading && (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Mostrar Snackbar con mensajes de éxito o error */}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default UpdateProductContainer;