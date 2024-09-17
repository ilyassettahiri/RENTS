
/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import ViewIcon from "@mui/icons-material/Visibility";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import ListActionHeader from "admin/components/ListActionHeader";
import { useQuery } from '@tanstack/react-query';

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DataTable from "examples/Tables/DataTable";
import TableSkeleton from "examples/Tables/DataTable/TableSkeleton";

import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import HTMLReactParser from "html-react-parser";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

import ProductCell from "admin/components/ProductCell";
import { format } from 'date-fns';


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";


function ListCollection() {
  const { t } = useTranslation();











  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  const navigate = useNavigate();



    // Use React Query to fetch data
    const { data: collectionsData, isLoading, error } = useQuery({
      queryKey: ['collections'],
      queryFn: () => CrudService.getCollections(),
      onError: (error) => {
        console.error('Failed to fetch collections:', error);
      },
    });
  
    // Memoize the table data
    const tableData = useMemo(() => {
      if (!collectionsData) return [];
  
      return collectionsData.data.map((row) => ({
        type: "collections",
        id: row.id,
        name: row.attributes.name,
        product: { image: row.attributes.picture, name: row.attributes.name, checked: false, id: row.id },
        created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'),
      }));
    }, [collectionsData]);




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
    }
  }, [notification]);

  const clickAddHandler = () => {
    navigate("/collection/create-collection");
  };

  const clickEditHandler = (id) => {
    navigate(`/collection/detail-collection/${id}`);
  };

  const clickViewHandler = (id) => {
    navigate(`/collection/detail-collection/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      if (!confirm("Are you sure you want to delete this category?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteCollection(id);
        // the delete does not send a response
        // so I need to get again the categories to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        const response = await CrudService.getCollections();
        setData(response.data);
        setNotification({
          value: true,
          text: "The category has been successfully deleted",
        });
      }
    } catch (err) {
      // it sends error is the category is associated with an item
      console.error(err);
      if (err.hasOwnProperty("errors")) {
        setNotification({
          value: true,
          text: err.errors[0].detail,
        });
      }
      return null;
    }
  };

  const getRows = (info) => {
    let updatedInfo = info.map((row) => {
      return {
        type: "collections",
        id: row.id,
        name: row.attributes.name,
        product: { image: row.attributes.picture, name: row.attributes.name, checked: false, id: row.id  },

        created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'), // Format the date here
      };
    });
    return updatedInfo;
  };

  const dataTableData = {
    columns: [

      {
        Header: "Title",
        accessor: "product",
        width: "40%",
        Cell: ({ cell: { value } }) => (
          <ProductCell image={value.image} name={value.name} checked={value.checked} 
          id={value.id} 
          linkPath={`/collection/detail-collection/${value.id}`}

          />
        ),
      },

     

      { Header: "Product", accessor: "name", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

     
      { Header: "created at", accessor: "created_at", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},


      
    ],

    rows: tableData,
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
      <SoftBox >
        <SoftBox my={3}>


          <ListActionHeader title="Create Collection" clickAddHandler={clickAddHandler} />




          <Card>
            
            {isLoading ? (
              <TableSkeleton rows={5} columns={5} />  
            ) : (
              <DataTable table={dataTableData} />
            )}


          </Card>
        </SoftBox>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default ListCollection;
