/* eslint-disable react/prop-types */


// react-router-dom components
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import Icon from "@mui/material/Icon";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import ProductCell from "admin/components/ProductCell";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DataTable from "examples/Tables/DataTable";

import HTMLReactParser from "html-react-parser";

import IdCell from "admin/components/IdCell";
import DefaultCell from "admin/components/DefaultCell";
import StatusCell from "admin/components/StatusCell";
import CustomerCell from "admin/components/CustomerCell";





// Data

function ListListing() {



  const { t } = useTranslation();


  // menu

    
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </SoftTypography>
      </MenuItem>
    </Menu>
  );




  // TeamProfileCard dropdown menu state
  const [marketingMenu, setMarketingMenu] = useState(null);
  const [designMenu, setDesignMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openMarketingMenu = (event) => setMarketingMenu(event.currentTarget);
  const closeMarketingMenu = () => setMarketingMenu(null);
  const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
  const closeDesignMenu = () => setDesignMenu(null);

  // Dropdown menu for the digital marketing TeamProfileCard
  const renderMarketingMenu = (
    <Menu
      anchorEl={marketingMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(marketingMenu)}
      onClose={closeMarketingMenu}
      keepMounted
    >
      <MenuItem onClick={closeMarketingMenu}>Action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Something else here</MenuItem>
    </Menu>
  );

  // Dropdown menu for the design TeamProfileCard
  const renderDesignMenu = (
    <Menu
      anchorEl={designMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(designMenu)}
      onClose={closeDesignMenu}
      keepMounted
    >
      <MenuItem onClick={closeDesignMenu}>Action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Another action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Something else here</MenuItem>
    </Menu>
  );










  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  useEffect(() => {
    (async () => {
      const response = await CrudService.getListings();
      setData(response.data);
    })();
  }, []);

  useEffect(() => {
    if (!state) return;
    setNotification({
      value: state.value,
      text: state.text,
    });
  }, [state]);

  useEffect(() => {
    setTableData(getRows(data));
  }, [data]);

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

  const clickOpenHandler = (category, url) => {
    const baseUrl = category === 'services' 
      ? `https://rents.ma/service-page/${url}`  // URL for services category
      : `https://rents.ma/listing-page/${category}/${url}`;  // Default URL for other categories
    
    window.open(baseUrl, '_blank');  // Open the URL in a new tab
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
          if (value === "paid") {
            status = <StatusCell icon="done" color="success" status="Paid" />;
          } else if (value === "refunded") {
            status = <StatusCell icon="replay" color="dark" status="Refunded" />;
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
                  

                  <IconButton onClick={() => clickOpenHandler(info.cell.row.original.category, info.cell.row.original.url)}>
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
      <SoftBox my={5}>




        <SoftBox display="flex" justifyContent="flex-end" my={3}>
          


              <SoftBox mr={2}>
                <SoftButton   sx={{ px:3, py: 0 }} variant="gradient" type="submit" onClick={clickAddHandler} color="info">

                  
                  <SoftTypography color="white" variant="body2" fontWeight="medium" >
                    {t('createListing')} 
                  </SoftTypography>

                </SoftButton>
              </SoftBox>

              <SoftBox display="flex">
                <SoftButton sx={{ px:3, py: 0 }} variant="contained" color="white" onClick={openMenu}>
                   
                 


                    <SoftBox display="flex" alignItems="center" gap={1}> {/* Flexbox to align icon and text */}
                      <SoftTypography color="dark" variant="body2" fontWeight="medium">
                      {t('More Action')} 
                      </SoftTypography>
                      <Icon>keyboard_arrow_down</Icon>
                    </SoftBox>
                </SoftButton>
                {renderMenu}
                
              </SoftBox>
          




        </SoftBox>


        

        <Card>
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 30,
              entries: [30, 50, 100, 200],
            }}
            canSearch
          />
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ListListing;