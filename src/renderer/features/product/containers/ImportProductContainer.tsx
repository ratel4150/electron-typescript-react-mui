// src\renderer\features\product\containers\ImportProductContainer.tsx
import React from 'react'
import DataGridGeneric from '../components/DataGridGeneric'
import useProduct from '../../../hooks/useProduct';
import { Alert, AlertProps, Snackbar } from '@mui/material';

const ImportProductContainer = () => {
    const { addProduct, loading, error, operationStatus } = useProduct(); // Usamos el hook
 
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
    const [hasSubmitted, setHasSubmitted] = React.useState(false); 

    React.useEffect(() => {
        if (hasSubmitted) {
          if (operationStatus === 'success') {
            setSnackbar({ children: 'Producto agregado correctamente', severity: 'success' });
          } else if (operationStatus === 'failed' && error) {
            setSnackbar({ children: `Error al agregar el producto: ${error}`, severity: 'error' });
          }
        }
      }, [operationStatus, error, hasSubmitted]); // Ahora dependemos de hasSubmitted
    
      const handleFormSubmit = (products: any) => {
        console.log(products);
        

      

        const transformedProducts = products.map((p: any) => {
            return {
                id: p.id,
                name: p.name,
                description: p.description || '',
                sku: p.sku,
                barcode: p.barcode,
                status: p.status ,
                pricing: {
                    basePrice: p.pricingBasePrice || 0,
                    sellingPrice: p.pricingSellingPrice || 0,
                    wholesalePrice: p.pricingWholesalePrice || 0,
                    suggestedRetailPrice: p.pricingSuggestedRetailPrice || 0,
                },
                dimensions: {
                    weight: p.dimensionsWeight || 0,
                    height: p.dimensionsHeight || 0,
                    width: p.dimensionsWidth || 0,
                    length: p.dimensionsLength || 0,
                },
                categories: p.categories ? p.categories.split(',') : [],  // Asumiendo que las categorías son una cadena separada por comas
                tags: p.tags ? p.tags.split(',') : [],  // Asumiendo que las etiquetas son una cadena separada por comas
                seo: {
                    metaTitle: p.seoMetaTitle || '',
                    metaDescription: p.seoMetaDescription || '',
                    slug:p.slug|| '',
                },
              /*   suppliers: p.suppliers ? p.suppliers.split(',').map((supplier: any) => ({
                    supplierId: supplier,
                    leadTime: 7, // Puedes ajustarlo según sea necesario
                    cost: 0, // Puedes ajustarlo según sea necesario
                    default: false,
                })) : [], */
                images: p.images ? p.images.split(',').map((url: any) => ({
                    url,
                    altText: '',
                    isPrimary: false,
                })) : [],
                salesData: {
                    totalSold: p.salesDataTotalSold || 0,
                    averageRating: p.salesDataAverageRating || 0,
                },
              /*   auditTrail: p.auditTrail || '', */
                metadata: {
                    brand: p.metadataBrand || '',
                    model: p.metadataModel || '',
                    warranty: p.metadataWarranty || '1 year', // Valor por defecto
                },
              /*   lifecycle: {
                    activeFrom: p.lifecycleActiveFrom ? new Date(p.lifecycleActiveFrom) : null,
                    activeUntil: p.lifecycleActiveUntil ? new Date(p.lifecycleActiveUntil) : null,
                },
                createdAt: new Date(p.createdAt || Date.now()),
                updatedAt: new Date(p.updatedAt || Date.now()),
                isNew: true, // Indica que esta fila es nueva */
            };
        });
        
       
        transformedProducts.forEach((product:any) => {
            addProduct(product); // Llamar a addProduct para cada producto
          
        });

        setHasSubmitted(true); // Marcar como enviado
       // Llama a la acción para agregar el producto
      };

      const handleCloseSnackbar = () => setSnackbar(null);
  return (
    <>
    <DataGridGeneric  onSubmit={handleFormSubmit}/>
    {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={2000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      {loading && <div>Cargando...</div>} {/* Puedes personalizar esto */}</>
  )
}

export default ImportProductContainer