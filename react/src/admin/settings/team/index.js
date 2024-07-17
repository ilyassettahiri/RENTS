 
/* eslint-disable react/prop-types */

 

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { format } from 'date-fns';

import DataTable from "examples/Tables/DataTable";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import { Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CrudService from "services/cruds-service";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { Can } from "Can";
import { subject } from "@casl/ability";

function ListTeam() {
  let { state } = useLocation();
  const [isDemo, setIsDemo] = useState(false);
  const [user, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });

  const navigate = useNavigate();
  const ability = useAbility(AbilityContext);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await CrudService.getUsers();

      console.log(' data:', response.data); // Logging the article data

      setUsers(response.data);

      setRoles(response.included);
      
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
    setTableData(getRows(user));
  }, [user]);

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
    navigate("/team/create-team");
  };

  const clickViewHandler = (id) => {
    navigate(`/team/detail-team/${id}`);
  };

  const clickDeleteHandler = async (e, id) => {
    try {
      if (!confirm("Are you sure you want to delete this user?")) {
        e.nativeEvent.stopImmediatePropagation();
      } else {
        await CrudService.deleteUser(id);
        // the delete does not send a response
        // so I need to get again the tags to set it and this way the table gets updated -> it goes to the useEffect with data dependecy
        const response = await CrudService.getUsers();
        setUsers(response.data);
        setNotification({
          value: true,
          text: "The user has been successfully deleted",
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
      let roleId = row.relationships.roles.data[0].id;
      let roleName = roles.find((role) => role.id == roleId);
      return {
        type: "users",
        id: row.id,
        image: row.attributes.profile_image,
        name: row.attributes.name,
        email: row.attributes.email,
        role: roleName.attributes.name,
        created_at: format(new Date(row.attributes.created_at), 'd MMM, h:mm a'), // Format the date here
      };
    });
    return updatedInfo;
  };

  const dataTableData = {
    columns: [
      {
        Header: "image",
        accessor: "image",
        width: "15%",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => {
          return (
            <>
              <SoftAvatar src={value} alt="profile-image" size="md" shadow="sm" />
            </>
          );
        },
      },


      { Header: "Name", accessor: "name", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

      { Header: "Email", accessor: "email", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

      { Header: "Role", accessor: "role", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

      
      
      { Header: "created at", accessor: "created_at", Cell: ({ row, value }) => (
        <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
          {value}
        </div>
      )},

     
      ,
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
      <SoftBox pt={6} pb={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox  lineHeight={1} display="flex" justifyContent="space-between">
              
              {ability.can("create", "users") && (
                <SoftButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  type="submit"
                  onClick={clickAddHandler}
                >
                  + Add User
                </SoftButton>
              )}
            </SoftBox>
            <DataTable table={dataTableData} />
          </Card>
        </SoftBox>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default ListTeam;
