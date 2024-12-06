// src\renderer\features\product\components\DataGridGeneric.tsx
/* // src\renderer\features\product\components\DataGridGeneric.tsx
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowModesModel, GridRowsProp, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react'
import * as XLSX from 'xlsx';

import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";

const initialRows: any[] = []; // Inicialmente vacío


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre del Producto', width: 200, editable: true },
    { field: 'description', headerName: 'Descripción', width: 300, editable: true },
    { field: 'sku', headerName: 'SKU', width: 150, editable: true },
    { field: 'barcode', headerName: 'Código de Barras', width: 180 },
    { field: 'status', headerName: 'Estado', width: 150, editable: true },
    { field: 'pricing.basePrice', headerName: 'Precio Base', type: 'number', width: 150, editable: true },
    { field: 'pricing.sellingPrice', headerName: 'Precio Venta', type: 'number', width: 150, editable: true },
    { field: 'pricing.wholesalePrice', headerName: 'Precio Mayorista', type: 'number', width: 170, editable: true },
    { field: 'pricing.suggestedRetailPrice', headerName: 'Precio Sugerido', type: 'number', width: 170 },
    { field: 'dimensions.weight', headerName: 'Peso (kg)', type: 'number', width: 120 },
    { field: 'dimensions.height', headerName: 'Altura (cm)', type: 'number', width: 120 },
    { field: 'dimensions.width', headerName: 'Ancho (cm)', type: 'number', width: 120 },
    { field: 'dimensions.length', headerName: 'Largo (cm)', type: 'number', width: 120 },
    { field: 'categories', headerName: 'Categorías', width: 200 },
    { field: 'tags', headerName: 'Etiquetas', width: 150 },
    { field: 'seo.metaTitle', headerName: 'Meta Título (SEO)', width: 200 },
    { field: 'seo.metaDescription', headerName: 'Meta Descripción (SEO)', width: 300 },
    { field: 'suppliers', headerName: 'Proveedores', width: 200 },
    { field: 'images', headerName: 'Imágenes', width: 200 },
    { field: 'salesData.totalSold', headerName: 'Ventas Totales', type: 'number', width: 150 },
    { field: 'salesData.averageRating', headerName: 'Calificación Promedio', type: 'number', width: 180 },
    { field: 'auditTrail', headerName: 'Auditoría', width: 200 },
    { field: 'metadata.brand', headerName: 'Marca', width: 150 },
    { field: 'metadata.model', headerName: 'Modelo', width: 150 },
    { field: 'metadata.warranty', headerName: 'Garantía', width: 150 },
    { field: 'lifecycle.activeFrom', headerName: 'Activo Desde', type: 'date', width: 180 },
    { field: 'lifecycle.activeUntil', headerName: 'Activo Hasta', type: 'date', width: 180 },
    { field: 'createdAt', headerName: 'Creado En', type: 'date', width: 180 },
    { field: 'updatedAt', headerName: 'Actualizado En', type: 'date', width: 180 },
];


const DataGridGeneric = () => {

    const [rows, setRows] = React.useState(initialRows);



  



    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
        XLSX.writeFile(workbook, 'Productos.xlsx');
    };

    const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFields = [
            'name', 'description', 'sku', 'barcode', 'status', 
            'pricing.basePrice', 'pricing.sellingPrice', 'pricing.wholesalePrice', 
            'pricing.suggestedRetailPrice', 'pricing.purchaseCost', 'pricing.discounts', 
            'pricing.taxes', 'dimensions.weight', 'dimensions.height', 'dimensions.width', 
            'dimensions.length', 'dimensions.unitOfMeasure', 'categories', 'tags', 
            'seo.metaTitle', 'seo.metaDescription', 'seo.slug', 'suppliers', 
            'images', 'videos', 'documents', 'salesData.totalSold', 
            'salesData.averageRating', 'salesData.reviews', 'auditTrail', 'metadata.brand', 
            'metadata.model', 'metadata.warranty', 'metadata.releaseDate', 'lifecycle.activeFrom', 
            'lifecycle.activeUntil', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ];
    
        const file = event.target.files?.[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    
                const isValid = jsonData.every((item: any) => {
                    return Object.keys(item).every((key) => allowedFields.includes(key));
                });
    
                if (!isValid) {
                    alert(`
    ╔════════════════════════════════════════════════════════════════════════╗
    ║                         Error de Importación                          ║
    ╠════════════════════════════════════════════════════════════════════════╣
    ║ El archivo contiene columnas no válidas.                              ║
    ║ Asegúrate de que el archivo siga este formato:                        ║
    ╠════════════════════════════════════════════════════════════════════════╣
    ║ Columnas permitidas:                                                  ║
    ║ - name                    - description           - sku                ║
    ║ - barcode                 - status               - pricing.basePrice  ║
    ║ - pricing.sellingPrice    - pricing.wholesalePrice - pricing.taxes    ║
    ║ - dimensions.weight       - dimensions.height     - dimensions.width  ║
    ║ - dimensions.length       - dimensions.unitOfMeasure                  ║
    ║ - categories              - tags                 - seo.metaTitle      ║
    ║ - suppliers               - images               - videos             ║
    ║ - documents               - salesData.totalSold  - salesData.reviews  ║
    ║ - metadata.brand          - metadata.model       - metadata.warranty  ║
    ║ - lifecycle.activeFrom    - lifecycle.activeUntil                     ║
    ║ - createdBy               - updatedBy            - createdAt          ║
    ║ - updatedAt               - auditTrail                                ║
    ╚════════════════════════════════════════════════════════════════════════╝
                    `);
                    return;
                }
    
                const formattedData = jsonData.map((item: any, index: number) => ({
                    id: index + 1,
                    ...item,
                }));
    
                setRows(formattedData);
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const processRowUpdate = (newRow: any) => {
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow;
    };


    


    const CustomToolbar = () => (
        <GridToolbarContainer>
            <Button variant="outlined" sx={{ mr: 2 }} component="label" size="small" startIcon={<CiImport/>}>
                Importar Productos
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={importFromExcel}
                />
            </Button>
            <Button

             
                startIcon={<CiExport />}
                size="small"
                variant='outlined'
                onClick={exportToExcel}
            >
                Exportar
            </Button>




        </GridToolbarContainer>
    );

  

    return (
        <Box sx={{ height: 500, width: '100%', mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Lista de Productos
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}


                checkboxSelection


                processRowUpdate={processRowUpdate}

                slots={{ toolbar: CustomToolbar }}
            />
     
        </Box>
    );

}

export default DataGridGeneric */

import { v4 as uuidv4 } from 'uuid';
import { Avatar, Box, Button, Grid } from '@mui/material';
import { IoIosAddCircle } from "react-icons/io";

import { GiSave, GiCancel} from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp, GridSlotProps, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react'
const roles = ['Market', 'Finance', 'Development'];
const initialRows: GridRowsProp = [];




const AvatarImage = ({data}:any) => {
 
    
    
      return (
        <Avatar
       
          alt="Remy Sharp"
          src={data}
        />
      );
    }
  




declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
    }
}


interface DataGridGenericProps {

    onSubmit: (products: any) => void;
  
  }

const DataGridGeneric:React.FC<DataGridGenericProps> = ({onSubmit}) => {

    const [rows, setRows] = React.useState(initialRows);
    console.log(rows);
    
    const exportToExcel = () => {
        const mutableRows = rows.map((row) => ({ ...row })); // Convierte las filas a un arreglo mutable
        const worksheet = XLSX.utils.json_to_sheet(mutableRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
        XLSX.writeFile(workbook, 'Productos.xlsx');
    };


    const importFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const allowedFields = [
            'name', 'description', 'sku', 'barcode', 'status', 
            'pricing.basePrice', 'pricing.sellingPrice', 'pricing.wholesalePrice', 
            'pricing.suggestedRetailPrice', 'pricing.purchaseCost', 'pricing.discounts', 
            'pricing.taxes', 'dimensions.weight', 'dimensions.height', 'dimensions.width', 
            'dimensions.length', 'dimensions.unitOfMeasure', 'categories', 'tags', 
            'seo.metaTitle', 'seo.metaDescription', 'seo.slug', 'suppliers', 
            'images', 'videos', 'documents'
        ];
    
        const file = event.target.files?.[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    
           /*      const isValid = jsonData.every((item: any) => {
                    return Object.keys(item).every((key) => allowedFields.includes(key));
                });
       */
    
               
                    const formattedData = jsonData.map((item: any, index: number) => ({
                        id: uuidv4(),
                        ...item,
                    }));


            console.log(formattedData); // Aquí puedes inspeccionar la estructura final antes de asignarla
            setRows(formattedData);
            };
            reader.readAsArrayBuffer(file);
        }
    };


    function EditToolbar(props: GridSlotProps['toolbar']) {
        const { setRows, setRowModesModel } = props;


        

     
    
       
    
        const handleClick = () => {
            const id = uuidv4(); // Genera un ID único para la nueva fila
            setRows((oldRows) => [
                ...oldRows,

                {
                    id,
                    name: '',
                    description: '',
                    sku: '',
                    barcode: '',
                    status: '',
                    pricingBasePrice: 0,
                    pricingSellingPrice: 0,
                    pricingWholesalePrice: 0,
                    pricingSuggestedRetailPrice: 0,
                    dimensionsWeight: 0,
                    dimensionsHeight: 0,
                    dimensionsWidth: 0,
                    dimensionsLength: 0,
                    categories: [],
                    tags: [],
                    seoMetaTitle: '',
                    seoMetaDescription: '',
                    slug:"",
                    suppliers: [],
                    images: [],
                    salesDataTotalSold: 0,
                    salesDataAverageRating: 0,
                    auditTrail: '',
                    metadataBrand: '',
                    metadataModel: '',
                    metadataWarranty: '',
                   /*  lifecycleActiveFrom: null,
                    lifecycleActiveUntil: null, */
                 /*    createdAt: new Date(),
                    updatedAt: new Date(), */
                    isNew: true, // Indica que esta fila es nueva
                },
                
             /*    {
                    id,
                    name: '',
                    description: '',
                    sku: '',
                    barcode: '',
                    status: '',
                    pricing: {
                        basePrice: 0,
                        sellingPrice: 0,
                        wholesalePrice: 0,
                        suggestedRetailPrice: 0,
                    },
                    dimensions: {
                        weight: 0,
                        height: 0,
                        width: 0,
                        length: 0,
                    },
                    categories: [],
                    tags: [],
                    seo: {
                        metaTitle: '',
                        metaDescription: '',
                    },
                    suppliers: [],
                    images: [],
                    salesData: {
                        totalSold: 0,
                        averageRating: 0,
                    },
                    auditTrail: '',
                    metadata: {
                        brand: '',
                        model: '',
                        warranty: '',
                    },
                    lifecycle: {
                        activeFrom: null,
                        activeUntil: null,
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isNew: true, // Indica que esta fila es nueva
                }, */
            ]);
        
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }, // Fija el foco en el campo "name"
            }));
        };
    
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<IoIosAddCircle />} onClick={handleClick}>
                    Agregar Registro
                </Button>
                <Button color="primary" startIcon={<IoIosAddCircle />} onClick={exportToExcel}>
                    Exportar
                </Button>
                <Button  sx={{ mr: 2 }} component="label" size="small" startIcon={<IoIosAddCircle/>}>
                Importar Productos
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={importFromExcel}
                />
                
            </Button>

            <Button color="primary" startIcon={<IoIosAddCircle />} /* onClick={exportToExcel} */>
                    Guardar Registros
                </Button>
            </GridToolbarContainer>)
    }

   
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id: GridRowId) => () => {
        console.log(id);
        
      setRows(rows?.filter((row) => row?.id !== id));
    };
  
    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
    


    const columns: GridColDef[] = [
      
        { field: 'name', headerName: 'Nombre del Producto', width: 200, editable: true },
        { field: 'description', headerName: 'Descripción', width: 300, editable: true },
        { field: 'sku', headerName: 'SKU', width: 150, editable: true },
        { field: 'barcode', headerName: 'Código de Barras', width: 180 ,editable:true},
        { field: 'status', headerName: 'Estado', width: 150, editable: true },
        {
            field: 'basePrice',
            headerName: 'Precio Base',
            type: 'number',
            width: 150,
            editable: true,
          
          },
          {
            field: 'sellingPrice',
            headerName: 'Precio Venta',
            type: 'number',
            width: 150,
            editable: true,
          
          },
          {
            field: 'wholesalePrice',
            headerName: 'Precio Mayorista',
            type: 'number',
            width: 170,
            editable: true,
           
          },
          {
            field: 'suggestedRetailPrice',
            headerName: 'Precio Sugerido',
            type: 'number',
            width: 170,
            editable: true,
          },
          {
            field: 'weight',
            headerName: 'Peso (kg)',
            type: 'number',
            width: 120,
            editable: true,
           
          },
          {
            field: 'height',
            headerName: 'Altura (cm)',
            type: 'number',
            width: 120,
            editable: true,
           
          },
          {
            field: 'width',
            headerName: 'Ancho (cm)',
            type: 'number',
            width: 120,
            editable: true,
           
          },
          {
            field: 'length',
            headerName: 'Largo (cm)',
            type: 'number',
            width: 120,
            editable: true,
           
          },
        { field: 'categories', headerName: 'Categorías', width: 200, editable: true },
        { field: 'tags', headerName: 'Etiquetas', width: 150, editable: true },
        { field: 'metaTitle', headerName: 'Meta Título (SEO)', width: 200, editable: true },
        { field: 'metaDescription', headerName: 'Meta Descripción (SEO)', width: 300,editable: true },
        { field: 'slug', headerName: 'Slug (SEO)', width: 300,editable: true },
        { field: 'suppliers', headerName: 'Proveedores', width: 200,editable: true },
        { field: 'images', headerName: 'Imágenes', width: 200,editable: true ,renderCell:(params)=>(<AvatarImage     data={params.row.images}/>)},
        { field: 'totalSold', headerName: 'Ventas Totales', type: 'number', width: 150 },
        { field: 'averageRating', headerName: 'Calificación Promedio', type: 'number', width: 180 },
        { field: 'auditTrail', headerName: 'Auditoría', width: 200 ,editable: true},
        { field: 'brand', headerName: 'Marca', width: 150,editable: true },
        { field: 'model', headerName: 'Modelo', width: 150,editable: true },
        { field: 'warranty', headerName: 'Garantía', width: 150,editable: true },
       /*  { field: 'activeFrom', headerName: 'Activo Desde', type: 'date', width: 180,editable: true },
        { field: 'activeUntil', headerName: 'Activo Hasta', type: 'date', width: 180,editable: true },
        { field: 'createdAt', headerName: 'Creado En', type: 'date', width: 180 },
        { field: 'updatedAt', headerName: 'Actualizado En', type: 'date', width: 180 },  */
    
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<GiSave/>}
                  label="Save"
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<GiCancel />}
                  label="Cancel"
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }


    
            return [
              <GridActionsCellItem
                icon={<MdEdit />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<AiTwotoneDelete />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        },
      ];

      
      const handleSubmit = () => {
             
        onSubmit(rows); // Validar los campos requeridos antes de enviar
    
  };
  
    return (
        <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
          <Grid item xs={12}>
          <Button onClick={handleSubmit}
            variant="contained"
        
          >
        Guardar Registros
          </Button>
        </Grid>
     
      </Box>
    )
}

export default DataGridGeneric