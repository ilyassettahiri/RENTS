

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { InputLabel, Autocomplete } from "@mui/material";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftAvatar from "components/SoftAvatar";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FormField from "admin/components/FormField";
import { useNavigate } from "react-router-dom";

import CrudService from "services/cruds-service";
import AuthService from "services/auth-service";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });

  const [value, setValue] = useState("");

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
    role: false,
    error: false,
    textError: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getRoles();
        setRoles(response.data);
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, []);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const changeImageHandler = (e) => {
    const forSoftata = new ForSoftata();
    forSoftata.append("attachment", e.target.files[0]);
    setFileState(forSoftata);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user.name.trim().length === 0) {
      setError({
        email: false,
        role: false,
        confirm: false,
        password: false,
        name: true,
        textError: "The name cannot be empty",
      });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setError({
        role: false,
        confirm: false,
        password: false,
        name: false,
        email: true,
        textError: "The email is not valid",
      });
      return;
    }

    if (user.password.trim().length < 8) {
      setError({
        name: false,
        email: false,
        role: false,
        confirm: false,
        password: true,
        textError: "The password should have at least 8 characters",
      });
      return;
    }

    if (user.confirm.trim() !== user.password.trim()) {
      setError({
        name: false,
        email: false,
        role: false,
        password: false,
        confirm: true,
        textError: "The password and password confirmation do not match",
      });
      return;
    }

    if (value.id === "") {
      setError({
        name: false,
        email: false,
        role: false,
        password: false,
        confirm: false,
        role: true,
        textError: "Role is required",
      });
      return;
    }

    const newUser = {
      data: {
        type: "users",
        attributes: {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.confirm,
          profile_image: null,
        },
        relationships: {
          roles: {
            data: [
              {
                id: value.id.toString(),
                type: "roles",
              },
            ],
          },
        },
      },
    };

    try {
      const res = await CrudService.createUser(newUser);
      try {
        const { url } = await CrudService.imageUpload(fileState, res.data.id);
        const userData = {
          data: {
            type: "profile",
            attributes: {
              profile_image: `${process.env.REACT_APP_IMAGES}${url}`,
            },
          },
        };
        const toUpdateUser = {
          data: {
            id: res.data.id.toString(),
            type: "users",
            attributes: {
              profile_image: fileState ? `${process.env.REACT_APP_IMAGES}${url}` : null,
            },
          },
        };
        await CrudService.updateUser(toUpdateUser, res.data.id);
      } catch (err) {
        setError({ ...error, error: true, textError: err.message });
        return null;
      }
      navigate("/settings/team", {
        state: { value: true, text: "The user was sucesfully created" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setError({ ...error, error: true, textError: err.errors[0].detail });
      }
      return null;
    }
  };

  return (
    <DashboardLayout>
      
      <SoftBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <SoftBox mt={6} mb={8} textAlign="center">
              <SoftBox mb={1}>
                <SoftTypography variant="h3" fontWeight="bold">
                  Add New User
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the user.
              </SoftTypography>
            </SoftBox>
            <Card>
              <SoftBox
                component="form"
                method="POST"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <SoftBox display="flex" flexDirection="column" px={3} my={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Name"
                        placeholder="Alec"
                        name="name"
                        value={user.name}
                        onChange={changeHandler}
                        error={error.name}
                        inputProps={{
                          autoComplete: "name",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                      />
                      {error.name && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </SoftTypography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Email"
                        placeholder="example@email.com"
                        inputProps={{
                          type: "email",
                          autoComplete: "email",
                          form: {
                            autoComplete: "off",
                          },
                        }}
                        name="email"
                        value={user.email}
                        onChange={changeHandler}
                        error={error.email}
                      />
                      {error.email && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </SoftTypography>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mt={4}>
                    <Grid item xs={12} sm={6}>
                      <SoftInput
                        fullWidth
                        label="Current Password"
                        inputProps={{ type: "password", autoComplete: "" }}
                        name="password"
                        value={user.password}
                        onChange={changeHandler}
                        error={error.password}
                      />
                      {error.password && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </SoftTypography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SoftInput
                        fullWidth
                        label="Confirm Password"
                        inputProps={{ type: "password", autoComplete: "" }}
                        name="confirm"
                        value={user.confirm}
                        onChange={changeHandler}
                        error={error.confirm}
                      />
                      {error.confirm && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {error.textError}
                        </SoftTypography>
                      )}
                    </Grid>
                  </Grid>
                  <SoftBox display="flex" flexDirection="column" fullWidth>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      fullWidth
                      marginBottom="1rem"
                      marginTop="2rem"
                    >
                      <Autocomplete
                        defaultValue=""
                        options={roles}
                        getOptionLabel={(option) => (option ? option.attributes.name : "")}
                        value={value ?? ""}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <FormField {...params} label="Role" InputLabelProps={{ shrink: true }} />
                        )}
                      />
                      {error.role && (
                        <SoftTypography
                          variant="caption"
                          color="error"
                          fontWeight="light"
                          paddingTop="1rem"
                        >
                          {error.textError}
                        </SoftTypography>
                      )}
                    </SoftBox>
                    <SoftBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                      fullWidth
                    >
                      <SoftBox mt={2} display="flex" flexDirection="column">
                        <InputLabel id="demo-simple-select-label">Profile Image</InputLabel>
                        <SoftInput
                          fullWidth
                          type="file"
                          name="attachment"
                          onChange={changeImageHandler}
                          id="file-input"
                          accept="image/*"
                          sx={{ mt: "16px" }}
                        ></SoftInput>
                      </SoftBox>

                      {imageUrl && (
                        <SoftBox ml={4} mt={2}>
                          <SoftAvatar src={imageUrl} alt="profile-image" size="xxl" shadow="sm" />
                        </SoftBox>
                      )}
                    </SoftBox>
                  </SoftBox>
                  {error.error && (
                    <SoftTypography variant="caption" color="error" fontWeight="light" pt={2}>
                      {error.textError}
                    </SoftTypography>
                  )}
                  <SoftBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <SoftBox mx={2}>
                      <SoftButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/settings/team", {
                            state: { value: false, text: "" },
                          })
                        }
                      >
                        Back
                      </SoftButton>
                    </SoftBox>
                    <SoftButton variant="gradient" color="info" size="small" type="submit">
                      Save
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
};

export default CreateTeam;
