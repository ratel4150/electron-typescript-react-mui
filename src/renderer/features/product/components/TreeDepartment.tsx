// src\renderer\features\product\components\TreeDepartment.tsx
import { Box } from '@mui/material'
import React from 'react'
import { TreeViewBaseItem } from '@mui/x-tree-view/models';

import { styled, alpha } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { Department } from '../types/departmentTypes';
const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
    {
      id: 'grid',
      label: 'Data Grid',
      children: [
        { id: 'grid-community', label: '@mui/x-data-grid' },
        { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
        { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
      ],
    },
    {
      id: 'pickers',
      label: 'Date and Time Pickers',
      children: [
        { id: 'pickers-community', label: '@mui/x-date-pickers' },
        { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
      ],
    },
    {
      id: 'charts',
      label: 'Charts',
      children: [{ id: 'charts-community', label: '@mui/x-charts' }],
    },
    {
      id: 'tree-view',
      label: 'Tree View',
      children: [{ id: 'tree-view-community', label: '@mui/x-tree-view' }],
    },
  ];
  
  const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0.2, 0),
      [`& .${treeItemClasses.label}`]: {
        fontSize: '0.8rem',
        fontWeight: 500,
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(0, 1.2),
      ...theme.applyStyles('light', {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
      }),
      ...theme.applyStyles('dark', {
        color: theme.palette.primary.contrastText,
      }),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    ...theme.applyStyles('light', {
      color: theme.palette.grey[800],
    }),
  }));


  

  interface TreeDepartmentProps {
    initialDepartments?: Department[];
  }
  const transformDepartmentsToTreeViewItems = (departments: Department[]): TreeViewBaseItem[] => {
    return departments.map((department) => ({
      id: department._id, // Usamos '_id' del tipo 'Department'
      label: department.name, // Asignamos el nombre del departamento
      // Mapeamos los subdepartamentos como TreeViewBaseItem
      children: department.subDepartments?.map((subDepartment) => ({
        id: subDepartment.name, // Usamos el 'name' del SubDepartment como ID
        label: subDepartment.name, // Nombre del subdepartamento
      })) || [], // Si no hay subdepartamentos, dejamos un arreglo vacío
    }));
  };
  const TreeDepartment: React.FC<TreeDepartmentProps> = ({ initialDepartments = [] }) => {

    const treeViewItems = transformDepartmentsToTreeViewItems(initialDepartments);
    console.log(treeViewItems)

/* 
    const [formData, setFormData] = React.useState<Partial<Department>>(initialDepartments || {}); */
    return (
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        <RichTreeView
          defaultExpandedItems={['grid']}
          slots={{ item: CustomTreeItem }}
          items={treeViewItems} // Pasa los departamentos transformados
        />
      </Box>
    );
  };

export default TreeDepartment