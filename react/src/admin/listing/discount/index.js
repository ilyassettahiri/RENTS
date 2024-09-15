
/* eslint-disable react/prop-types */


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { format } from 'date-fns';

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import IdCell from "admin/components/IdCell";
import StatusCell from "admin/components/StatusCell";
import ListActionHeader from "admin/components/ListActionHeader";

import DataTable from "examples/Tables/DataTable";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import HTMLReactParser from "html-react-parser";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";


function ListDiscount() {
  const { t } = useTranslation();


















  let { state } = useLocation();
  const ability = useAbility(AbilityContext);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  const navigate = useNavigate();




  useEffect(() => {
    (async () => {
      const response = await CrudService.getDiscounts();
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
    }
  }, [notification]);

  const clickAddHandler = () => {
    navigate("/discount/create-discount");
  };

  const clickViewHandler = (id) => {
    navigate(`/discount/detail-discount/${id}`);
  };






  const clickDeleteHandler = async (e, id) => {
    try {
      if (!confirm("Are you sure you want to delete this discount?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteDiscount(id);
        // the delete does not send a response
        // so I need to get again the categories to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        const response = await CrudService.getDiscounts();
        setData(response.data);
        setNotification({
          value: true,
          text: "The discount has been successfully deleted",
        });
      }
    } catch (err) {
      // it sends error is the discount is associated with an item
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
      type: row.attributes.type,
      applies: row.attributes.applies,
      status: row.attributes.status,



      code: row.attributes.code,
      percentage: row.attributes.discountvalue,
      created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'), // Format the date here
      id: row.id,
    }));
  };




  const dataTableData = {
    columns: [

      { Header: "ID", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },

      
      

      { Header: "Code", accessor: "code", Cell: ({ row, value }) => (
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
          if (value === "active") {
            status = <StatusCell icon="done" color="success" status="Active" />;
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



      { Header: "Type", accessor: "type", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},
      


      { Header: "Created at", accessor: "created_at", Cell: ({ row, value }) => (
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
      <SoftBox my={3}>
        


        <ListActionHeader title="Create Discount" clickAddHandler={clickAddHandler} />







          <Card>
            <SoftBox  lineHeight={1} display="flex" justifyContent="space-between">
              
              {ability.can("create", "categories") && (
                <SoftButton
                  variant="gradient"
                  
                  size="small"
                  type="submit"
                  onClick={clickAddHandler}
                  // disabled={isDemo}
                >
                  + Add discount
                </SoftButton>
              )}
            </SoftBox>
            <DataTable table={dataTableData} />
          </Card>
        
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default ListDiscount;
