

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { InputLabel, Autocomplete } from "@mui/material";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftAvatar from "components/SoftAvatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "admin/components/FormField";
import { useNavigate, useParams } from "react-router-dom";

import CrudService from "services/cruds-service";

const DetailTeam = () => {







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










  const { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const [value, setValue] = useState({});

  const [error, setError] = useState({
    name: false,
    email: false,
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

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const response = await CrudService.getUser(id);
        const getData = response.data;
        const roleData = await CrudService.getRole(getData.relationships.roles.data[0].id);
        const role = roleData.data;
        setUser({
          id: getData.id,
          name: getData.attributes.name,
          email: getData.attributes.email,
          role: getData.relationships.roles.data[0].id,
        });
        setImage(getData.attributes.profile_image);
        setValue(role);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      const role = roles.find((role) => role.id === user.role);
      setValue(role);
    }
  }, [roles]);

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
        name: true,
        textError: "The name cannot be empty",
      });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setError({
        role: false,
        name: false,
        email: true,
        textError: "The email is not valid",
      });
      return;
    }

    if (value.id && value.id === "") {
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

    try {
      let { url } = fileState
        ? await CrudService.imageUpload(fileState, user.id.toString())
        : image;
      const newUser = {
        data: {
          id: user.id.toString(),
          type: "users",
          attributes: {
            name: user.name,
            email: user.email,
            profile_image: fileState ? `${process.env.REACT_APP_IMAGES}${url}` : image,
          },
          relationships: {
            roles: {
              data: [
                {
                  id: value.id ? value.id.toString() : user.role.toString(),
                  type: "roles",
                },
              ],
            },
          },
        },
      };

      try {
        const res = await CrudService.updateUser(newUser, newUser.data.id);
        navigate("/settings/team", {
          state: { value: true, text: "The user was sucesfully updated" },
        });
      } catch (err) {
        if (err.hasOwnProperty("errors")) {
          setError({ ...error, error: true, textError: err.errors[0].detail });
        }
        console.error(err);
      }
    } catch (err) {
      setError({ ...error, error: true, textError: err.message });
      return null;
    }
  };

  return (
    <DashboardLayout>
      
      <SoftBox mt={5} mb={9}>


            <SoftBox display="flex" justifyContent="flex-end" mb={2}>

              <SoftBox mr={3}>
                <SoftButton variant="gradient" color="info" >
                  New Listing
                </SoftButton>
              </SoftBox>

              <SoftBox display="flex">
                <SoftButton variant={menu ? "contained" : "gradient"} color="white" onClick={openMenu}>
                  More Action &nbsp;
                  <Icon>keyboard_arrow_down</Icon>
                </SoftButton>
                {renderMenu}
                
              </SoftBox>
            </SoftBox>






        <Grid container spacing={3}>







          <Grid item xs={12} lg={8}>
            
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
                        inputProps={{ type: "email" }}
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
                  <SoftBox display="flex" flexDirection="column" fullWidth>
                    <SoftBox display="flex" flexDirection="column" fullWidth marginTop="2rem">
                      <Autocomplete
                        defaultValue={null}
                        options={roles}
                        getOptionLabel={(option) => {
                          if (option.data) {
                            if (option.data.attributes) {
                              if (option.data.attributes.name) return option.data.attributes.name;
                            }
                          } else {
                            if (option.attributes) {
                              if (option.attributes.name) return option.attributes.name;
                            }
                          }
                          return "";
                        }}
                        value={value ?? null}
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

                      {image && (
                        <SoftBox ml={4} mt={2}>
                          <SoftAvatar
                            src={imageUrl ?? image}
                            alt="profile-image"
                            size="xxl"
                            shadow="sm"
                          />
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



          <Grid item xs={12} lg={4}>


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="digital marketing"
                  description="A group of people who collectively are responsible for all of the work necessary to produce working, validated assets."
                  industry="marketing team"
                  rating={4.5}
                  
                  dropdown={{
                    action: openMarketingMenu,
                    menu: renderMarketingMenu,
                  }}
                />
              </SoftBox>
            </Grid>


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="design"
                  description="Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too."
                  industry="design team"
                  rating={5}
                  
                  dropdown={{
                    action: openDesignMenu,
                    menu: renderDesignMenu,
                  }}
                />
              </SoftBox>
            </Grid>
            
          </Grid>



        </Grid>


      </SoftBox>
     
    </DashboardLayout>
  );
};

export default DetailTeam;
