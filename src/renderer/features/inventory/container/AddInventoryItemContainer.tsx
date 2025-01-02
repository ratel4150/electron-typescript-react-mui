// src\renderer\features\inventory\container\AddInventoryItemContainer.tsx
import React from 'react'
import InventoryItemForm from '../components/InventoryItemForm'
import ProductFinder from '../../product/components/ProductFinder';
import { Product } from '../../product/types/productTypes';
import { getProductsByBarCode } from '../../product/services/productService';
import { getInventoryItembyBarCode } from '../services/inventoryService';
import { InventoryItem } from '../../product/types/inventoryItem';
import InventoryItemFormSkeleton from '../components/inventoryItemFormSkeleton';
import useInventoryItem from '../../../hooks/useInventoryItem';
import { Alert, AlertProps, Snackbar } from '@mui/material';



const AddInventoryItemContainer = () => {
  let {updateInventoryItem} = useInventoryItem()

  const [product, setProduct] = React.useState<InventoryItem | null>(null); // Producto a editar
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false); // Estado de carga para búsqueda
    const [searchError, setSearchError] = React.useState<string | null>(null); // Error en búsqueda
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, "children" | "severity"> | null>(null);
    

  const [componentVisibility, setComponentVisibility] = React.useState({
    productFinder: true,
    inventoryItemForm: false,
  });


  const handleFormSubmit = (inventoryItem: any) => {
    // Llama a la acción para agregar el producto
    
    updateInventoryItem(inventoryItem)
    setSnackbar({ children: "Producto actualizado correctamente.", severity: "success" });
  };

  const handleCloseSnackbar = () => setSnackbar(null);
  return (
    <>
      {loadingSearch && <InventoryItemFormSkeleton />}
      {!loadingSearch && componentVisibility.productFinder && (
        <ProductFinder onSearch={async function (barCode: string): Promise<void> {
        setLoadingSearch(true);
            setSearchError(null);
            setProduct(null);
        
            try {
              const productData = await getInventoryItembyBarCode(barCode);
              setProduct(productData);
              setComponentVisibility({
                productFinder: false,
                inventoryItemForm: true,
              })
            } catch (err) {
              setSearchError("No se pudo encontrar el producto. Verifica el código de barras.");
            } finally {
              setLoadingSearch(false);
            }
        } } loading={false} />
      )}
      {!loadingSearch && componentVisibility.inventoryItemForm && (
        <InventoryItemForm type="update" onSubmit={handleFormSubmit}   initialData={product} />
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
    </>
  
  )
}

export default AddInventoryItemContainer