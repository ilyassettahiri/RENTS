/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import Icon from "@mui/material/Icon";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";


import ListActionHeader from "admin/components/ListActionHeader";

import SoftBox from "components/SoftBox";

import SoftTypography from "components/SoftTypography";
import ProductCell from "admin/components/ProductCell";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DataTable from "examples/Tables/DataTable";
import TableSkeleton from "examples/Tables/DataTable/TableSkeleton";



import HTMLReactParser from "html-react-parser";

import IdCell from "admin/components/IdCell";
import DefaultCell from "admin/components/DefaultCell";
import StatusCell from "admin/components/StatusCell";
import CustomerCell from "admin/components/CustomerCell";





// Data

function ListListing() {
  const { t } = useTranslation();












  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });


    // Use React Query to fetch data
    const { data: listingsData, isLoading, error } = useQuery({
      queryKey: ['listings'],
      queryFn: () => CrudService.getListings(),
      onError: (error) => {
        console.error('Failed to fetch listings:', error);
      },
    });
  
    // Memoize the table data
    const tableData = useMemo(() => {
      if (!listingsData) return [];
  
      return listingsData.data.map((row) => ({
        product: { image: `${process.env.REACT_APP_IMAGE_LISTING_SMALL}${row.attributes.picture}`, name: row.attributes.title, checked: false, id: row.id },
        price: row.attributes.price,
        status: row.attributes.status,
        created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'),
        id: row.id,
        category: row.attributes.category,
        url: row.attributes.url,
        city: row.attributes.city,
        jobtype: row.attributes.jobtype,

      }));
    }, [listingsData]);



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

  const clickEditHandler = (id) => {
    navigate(`/listing/edit-listing/${id}`);
  };

  const clickViewHandler = (id) => {
    navigate(`/listing/detail-listing/${id}`);
  };




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
  
  

  const handleRowClick = (row) => {
    clickViewHandler(row.original.id);
  };

 

  const getRows = (info) => {
    return info.map((row) => ({
      product: { image: row.attributes.picture, name: row.attributes.title, checked: false, id: row.id  },
      price: row.attributes.price,
      status: row.attributes.status,
      created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'), // Format the date here
      id: row.id,
      category: row.attributes.category,
      url: row.attributes.url,
      city: row.attributes.city,

      jobtype: row.attributes.jobtype,

    }));
  };

  const dataTableData = {
    columns: [
      {
        Header: "product",
        accessor: "product",
        width: "40%",
        Cell: ({ cell: { value } }) => (
          <ProductCell image={value.image} name={value.name} checked={value.checked} 
          id={value.id} 
          linkPath={`/listing/detail-listing/${value.id}`}

          />
        ),
      },
      

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const value = row.original.status;
          let status;
          if (value === "pending") {
            status = <StatusCell icon="done" color="success" status="Active" />;
          } else if (value === "active") {
            status = <StatusCell icon="done" color="success" status="Active" />;
          } else {
            status = <StatusCell icon="close" color="error" status="Canceled" />;
          }
          return (
            <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
              {status}
            </div>
          );
        },
      },
      { Header: "price", accessor: "price", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},
      { Header: "created at", accessor: "created_at", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},
      {
        Header: "actions",
        disableSortBy: true,
        accessor: "",
        Cell: (info) => (
          <SoftBox display="flex" alignItems="left">

              <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                <Tooltip title="Preview product" placement="top">
                  

                  <IconButton onClick={() => clickOpenHandler(info.cell.row.original.category, info.cell.row.original.url, info.cell.row.original.jobtype, info.cell.row.original.city)}>
                    <ViewIcon color="secondary"/>
                  </IconButton>
                </Tooltip>
              </SoftTypography>

           
            
              <Tooltip title="Edit listing" color="secondary" placement="top">
                <IconButton onClick={() => clickEditHandler(info.cell.row.original.id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            
          </SoftBox>
        ),
      },
    ],
    

    rows: tableData,
    onRowClick : {handleRowClick},  // Add this line
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


        

        <Card>

          {isLoading ? (
            <TableSkeleton rows={5} columns={5} />  
          ) : (
              <DataTable
                table={dataTableData}
                entriesPerPage={{
                  defaultValue: 30,
                  entries: [30, 50, 100, 200],
                }}
                canSearch
              />
          )}


        </Card>


        
      </SoftBox>
    </DashboardLayout>
  );
}

export default ListListing;