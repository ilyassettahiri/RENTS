import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftEditor from "components/MDEditor";
import SoftTypography from "components/SoftTypography";

// Custom components
import Header from "admin/store/create-store/components/Header";
import FormField from "admin/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Address from "components/Address";

// Services
import CrudService from "services/cruds-service";

function CreateStore() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [title, setTitle] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [name, setName] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const changeTitleHandler = (e) => {
    setTitle({ ...title, text: e.target.value });
  };

  const changeNameHandler = (e) => {
    setName({ ...name, text: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (title.text.trim().length < 1) {
      setTitle({ ...title, error: true, textError: "The Title is required" });
      return;
    }

    if (name.text.trim().length < 1) {
      setName({ ...name, error: true, textError: "The Name is required" });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags.trim().length < 1) {
      setDescError(true);
      return;
    }

    const formData = new FormData();
    formData.append("data[attributes][title]", title.text);
    formData.append("data[attributes][name]", name.text);
    formData.append("data[attributes][description]", description);
    formData.append("data[attributes][address]", address.address);
    formData.append("data[attributes][city]", address.city);
    formData.append("data[attributes][country]", address.country);
    formData.append("data[attributes][zip]", address.zip);

    if (profileImage) {
      formData.append("data[attributes][profil_picture]", profileImage);
    }
    if (backgroundImage) {
      formData.append("data[attributes][picture]", backgroundImage);
    }

    try {
      await CrudService.createOnlinestore(formData);
      navigate("/listing/all", {
        state: { value: true, text: "The Store was successfully created" },
      });
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <DashboardLayout>
      <SoftBox mt={1} mb={20} component="form" method="POST" onSubmit={submitHandler}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Header 
              profileImage={profileImage} 
              backgroundImage={backgroundImage}
              onProfileImageChange={handleProfileImageChange}
              onBackgroundImageChange={handleBackgroundImageChange}
            />
            <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
              <SoftBox p={3}>
                <SoftTypography variant="h5">Store Information</SoftTypography>
                <SoftBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <SoftBox p={1}>
                        <FormField
                          type="text"
                          label="Store Name"
                          name="name"
                          value={name.text}
                          onChange={changeNameHandler}
                          error={name.error}
                        />
                        {name.error && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {name.textError}
                          </SoftTypography>
                        )}
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SoftBox p={1}>
                        <FormField
                          type="text"
                          label="Title"
                          name="title"
                          value={title.text}
                          onChange={changeTitleHandler}
                          error={title.error}
                        />
                        {title.error && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {title.textError}
                          </SoftTypography>
                        )}
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
                <SoftBox mt={2}>
                  <SoftBox mt={2}>
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Description&nbsp;&nbsp;
                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} onChange={setDescription} />
                    {descError && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        The Store description is required
                      </SoftTypography>
                    )}
                  </SoftBox>
                </SoftBox>
                <SoftBox mt={2}>
                  <Address address={address} onAddressChange={handleAddressChange} />
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
          
        </Grid>
        <SoftBox  mt={4} mb={2} display="flex" justifyContent="flex-end">
            <SoftButton variant="gradient" color="dark" size="small" type="submit">
              Save
            </SoftButton>
          </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CreateStore;
