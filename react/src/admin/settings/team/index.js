/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { format } from 'date-fns';
import DataTable from "examples/Tables/DataTable";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import CrudService from "services/cruds-service";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ListTeam() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { state } = useLocation();

  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({
    value: false,
    text: "",
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getTeams();  // Fetch users and roles
        setUsers(response.data);  // Set users
      } catch (err) {
        console.error("Error fetching data:", err);
      }
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
    setTableData(getRows(users));  // Update table data with user rows
  }, [users]);

  const clickAddHandler = () => {
    navigate("/team/create-team");
  };

  const clickViewHandler = (id) => {
    navigate(`/team/detail-team/${id}`);
  };

  const getRows = (users) => {
    return users.map((user) => {
      const roleName = user.relationships?.roles[0]?.name || 'N/A';  // Extract role name from relationships

      return {
        id: user.id,
        image: user.attributes.profile_image,
        name: user.attributes.name,
        email: user.attributes.email,
        role: roleName,
        created_at: format(new Date(user.attributes.created_at), 'd MMM, h:mm a'),  // Format the creation date
      };
    });
  };

  const dataTableData = {
    columns: [
      {
        Header: "Image",
        accessor: "image",
        width: "15%",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => {
          return <SoftAvatar src={value} alt="profile-image" size="md" shadow="sm" />;
        },
      },
      { 
        Header: "Name", 
        accessor: "name", 
        Cell: ({ row, value }) => (
          <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        ) 
      },
      { 
        Header: "Email", 
        accessor: "email", 
        Cell: ({ row, value }) => (
          <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        ) 
      },
      { 
        Header: "Role", 
        accessor: "role", 
        Cell: ({ row, value }) => (
          <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        ) 
      },
      { 
        Header: "Created At", 
        accessor: "created_at", 
        Cell: ({ row, value }) => (
          <div onClick={() => clickViewHandler(row.original.id)} style={{ cursor: "pointer" }}>
            {value}
          </div>
        ) 
      },
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
            
            <DataTable table={dataTableData} />
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default ListTeam;
