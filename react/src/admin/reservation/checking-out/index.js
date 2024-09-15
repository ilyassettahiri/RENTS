 
/* eslint-disable react/prop-types */

 

// react-router-dom components
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import Icon from "@mui/material/Icon";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";
import ListActionHeader from "admin/components/ListActionHeader";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from 'date-fns';
import ViewIcon from "@mui/icons-material/Visibility";


import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import ProductCell from "admin/components/ProductCell";


import IdCell from "admin/components/IdCell";
import DefaultCell from "admin/components/DefaultCell";
import StatusCell from "admin/components/StatusCell";
import CustomerCell from "admin/components/CustomerCell";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import DataTable from "examples/Tables/DataTable";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import HTMLReactParser from "html-react-parser";

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const team1 = `${imagePath}/team-1.jpg`;

export {
  team1
};


// Data

function ListCheckingOut() {
  const { t } = useTranslation();














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
      const response = await CrudService.getCheckingOuts();
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
    navigate(`/reservation/detail-checking-out/${id}`);
  };

  const clickViewHandler = (id) => {
    navigate(`/reservation/detail-checking-out/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      if (!confirm("Are you sure you want to delete this reservation?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteReservation(id);
        const response = await CrudService.getReservations();
        setData(response.data);
        setNotification({
          value: true,
          text: "The Reservation has been successfully deleted",
        });
      }
    } catch (err) {
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
    return info.map((row) => ({
      id: {  ID: row.attributes.id},
      price: row.attributes.price,
      customer: { image:team1 , name: row.attributes.name, checked: false, id: row.id  },
      status: row.attributes.status,
      title: row.attributes.title,
      created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'), // Format the date here
      id: row.id,
    }));
  };




  const dataTableData = {

    columns: [


      

      { Header: "ID", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },


      { Header: "Created at", accessor: "created_at", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

      


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



      {
        Header: "Customer",
        accessor: "customer",
        Cell: ({ cell: { value } }) => (
          <CustomerCell image={value.team1} color={"dark"} name={value.name} 
          
          linkPath={`/reservation/detail-reservation/${value.id}`}
          />
        ),
      },


      { Header: "Revenue", accessor: "price", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},


      
      { Header: "Product", accessor: "title", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},
     
      



     


    ],
    rows: tableData,
  };
  const clickAddHandler = () => {
    navigate("/reservation/create-reservation");
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
        

      <ListActionHeader title="New Reservation" clickAddHandler={clickAddHandler} />




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

export default ListCheckingOut;