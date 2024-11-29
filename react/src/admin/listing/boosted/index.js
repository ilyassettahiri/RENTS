/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';


import { Card, Box, Button, Tooltip, IconButton, Stack } from "@mui/material";
import { Label } from 'components/label';

import SoftAlert from "components/SoftAlert";
import SoftBadge from "components/SoftBadge";


import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";

import { useBoolean } from 'hooks/use-boolean';
import { useSetState } from 'hooks/use-set-state';

import ListActionHeader from "admin/components/ListActionHeader";

import SoftBox from "components/SoftBox";

import SoftTypography from "components/SoftTypography";

import { toast } from 'components/snackbar';
import { Iconify } from 'components/iconify';
import { EmptyContent } from 'components/empty-content';
import { ConfirmDialog } from 'components/custom-dialog';


// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";


import TableSkeleton from "examples/Tables/DataTable/TableSkeleton";

import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';



import { ProductTableToolbar } from 'admin/listing/all/product-table-toolbar';
import { ProductTableFiltersResult } from 'admin/listing/all/product-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from 'admin/listing/all/product-table-row';



const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];



function ListBoosted() {
  const { t } = useTranslation();

  let { state } = useLocation();
  
  const navigate = useNavigate();


  const confirmRows = useBoolean();


  const filters = useSetState({ publish: [], stock: [] });

  const [tableData, setTableData] = useState([]);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

 
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });




    const { data: listingsData, isLoading, error } = useQuery({
      queryKey: ['boostedListings'],
      queryFn: () => CrudService.getBoosteds(),
      onError: (error) => {
        console.error('Failed to fetch listings:', error);
      },
    });




    useEffect(() => {
      if (listingsData?.data?.length) {
        const transformedData = listingsData.data.map((row, index) => ({
          id: index + 1, // Assign consecutive IDs starting from 1
          listingId: row.id, // Keep the original listing ID
          title: row.attributes.title,
          price: row.attributes.price,
          status: row.attributes.status,
          createdAt: row.attributes.created_at,
          category: row.attributes.category,
          city: row.attributes.city,
          url: row.attributes.url,
          jobtype: row.attributes.jobtype,
          picture: row.attributes.picture,
        }));
    
        setTableData(transformedData);
      }
    }, [listingsData]);
    
    
  
   




  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  const dataFiltered = applyFilter({ inputData: tableData, filters: filters.state });

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback((id) => navigate(`/listing/edit-listing/${id}`), [navigate]);


  const handleViewRow = useCallback((id) => navigate(`/listing/detail-listing/${id}`), [navigate]);


  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns = [
    { field: 'category', headerName: 'Category', filterable: false },
    {
      field: 'name',
      headerName: 'Listing',
      flex: 1,
      minWidth: 300,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct params={params} 
        onViewRow={() => navigate(`/listing/detail-listing/${params.row.listingId}`)} 

        
        />
      ),
    },
    
   
   
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => {
        let color = 'default';
        let badgeContent = 'unknown';
    
        // Dynamically set color and badgeContent based on status value
        if (params.value === 'published') {
          color = 'success';
          badgeContent = 'Published';
        } else if (params.value === 'draft') {
          color = 'warning';
          badgeContent = 'Draft';
        } else if (params.value === 'pending') {
          color = 'success';
          badgeContent = 'Pending';
        }
    
        return (
          <SoftBadge
            variant="contained"
            color={color}
            badgeContent={badgeContent}
            container
            size="xs"
          />
        );
      },
    },
    


    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },


    {
      field: 'createdAt',
      headerName: 'Create at',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    

    {
      type: 'actions',
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          key={`${params.row.id}-view`} 

          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          

          onClick={() =>
            clickOpenHandler(
              params.row.category,  // Pass category
              params.row.url,       // Pass URL
              params.row.jobtype,   // Pass jobtype
              params.row.city        // Pass city
            )
          }

        />,
        <GridActionsCellItem

          key={`${params.row.id}-edit`} 

          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.listingId)}
        />,
        <GridActionsCellItem

          key={`${params.row.id}-delete`} 

          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.listingId);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);






  useEffect(() => {
    if (!state) return;
    setNotification({
      value: state.value,
      text: state.text,
    });
  }, [state]);

 
  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({
          value: false,
          text: "",
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

 




  const clickOpenHandler = (category, url, jobtype, city) => {
    const formatJobType = (jobtype) => {
      if (!jobtype) return ""; // Return an empty string if jobtype is null or undefined
      return jobtype
        .toLowerCase()
        .normalize("NFD") // Normalize accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim()
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
    };
  
    // Determine the type based on category
    const type = (category === 'services' || category === 'jobs')
      ? formatJobType(jobtype)
      : `${category}-for-rent`;
  
   
    // Build the full URL based on category
    const baseUrl = category === 'services'
      ? `en/${city}/${type}/${url}`
      : category === 'jobs'
      ? `en/${city}/${type}/${url}`
      : `en/${city}/${category}/${type}/${url}`; // Default URL for other categories
    
      window.open(`https://rents.ma/${baseUrl}`, '_blank'); 
  };
  
  

  
 

  
    
  const clickAddHandler = () => {
    navigate("/listing/create-listing");
  };

  return (
    <DashboardLayout>
      {notification.value && (
        <SoftAlert color="info" my="20px">
          <SoftTypography variant="body2" color="white">
            {notification.text}
          </SoftTypography>
        </SoftAlert>
      )}
      <SoftBox my={3}>

      <ListActionHeader title="createListing" clickAddHandler={clickAddHandler} />


          
            <Card sx={{ height: "100%" }}>

              <DataGrid
                checkboxSelection
                disableRowSelectionOnClick
                rows={dataFiltered}
                columns={columns}
                loading={isLoading}
                getRowHeight={() => 'auto'}
                pageSizeOptions={[100, 200, 500]}
                initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                slots={{
                  toolbar: CustomToolbarCallback,
                  
                  noRowsOverlay: () => <EmptyContent />,
                  noResultsOverlay: () => <EmptyContent title="No results found" />,
                }}
                slotProps={{
                  panel: { anchorEl: filterButtonEl },
                  toolbar: { setFilterButtonEl },
                  columnsManagement: { getTogglableColumns },
                }}
                sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex',  },
                
                border: 'none',
                
                fontSize: '14px',

                '& .MuiButtonBase-root.MuiButton-root': {
                    color: 'black', // Set button color to black
                  },
              
                }}
              />
            </Card>

          
      </SoftBox>
    </DashboardLayout>
  );
}

export default ListBoosted;




function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}) {
  return (
    <SoftBox py={2} px={2}>


          <GridToolbarContainer>
            

                <GridToolbarQuickFilter />

                <Stack
                  spacing={1}
                  flexGrow={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  {!!selectedRowIds.length && (
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      onClick={onOpenConfirmDeleteRows}
                    >
                      Delete ({selectedRowIds.length})
                    </Button>
                  )}

                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton ref={setFilterButtonEl} />
                  <GridToolbarExport />
                </Stack>
          </GridToolbarContainer>

      
    </SoftBox>
  );
}

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
