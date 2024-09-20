import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftSelect from "components/SoftSelect";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    country: "",
    zip: "",
  });



  const [name, setName] = useState({
    text: "",
    error: false,
    textError: "",
  });


  const [phone, setPhone] = useState({
    text: "",
    error: false,
    textError: "",
  });


  const [email, setEmail] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [selectedCategory, setSelectedCategory] = useState('');


  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

 

  const changeNameHandler = (e) => {
    setName({ ...name, text: e.target.value });
  };


  const changePhoneHandler = (e) => {
    setPhone({ ...phone, text: e.target.value });
  };

  const changeEmailHandler = (e) => {
    setEmail({ ...email, text: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    

    if (name.text.trim().length < 1) {
      setName({ ...name, error: true, textError: "The Name is required" });
      return;
    }


    if (phone.text.trim().length < 1) {
      setPhone({ ...phone, error: true, textError: "The Phone is required" });
      return;
    }

    if (email.text.trim().length < 1) {
      setEmail({ ...email, error: true, textError: "The Email is required" });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags.trim().length < 1) {
      setDescError(true);
      return;
    }

    const formData = new FormData();
    formData.append("data[attributes][name]", name.text);
    formData.append('data[attributes][category]', selectedCategory);

    formData.append("data[attributes][phone]", phone.text);

    formData.append("data[attributes][email]", email.text);

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
          <Grid item xs={12} lg={10}>
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
                          placeholder="name"
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


                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                            Type
                          </SoftTypography>
                        </SoftBox>
                        
                          <SoftSelect

                            placeholder="Select Category"
                            options={[
                              
                              { value: "boats", label: "boats" },
                              { value: "camions", label: "camions" },
                              { value: "caravans", label: "caravans"  },
                              { value: "cars", label: "cars"},
                              { value: "engins", label: "engins" },
                              { value: "motos", label: "motos" },
                            
                            ]}




                            onChange={handleCategoryChange}
                          />

                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>






                <SoftBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <SoftBox p={1}>
                        <FormField
                          type="text"
                          label="phone"
                          placeholder="phone"
                          name="phone"
                          value={phone.text}
                          onChange={changePhoneHandler}
                          error={phone.error}
                        />
                        {phone.error && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {phone.textError}
                          </SoftTypography>
                        )}
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SoftBox p={1}>
                        <FormField
                          type="text"
                          label="email"
                          name="email"
                          placeholder="example@gmail.com"

                          value={email.text}
                          onChange={changeEmailHandler}
                          error={email.error}
                        />
                        {email.error && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {email.textError}
                          </SoftTypography>
                        )}
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>



                <SoftBox mt={2}>
                  <SoftBox mt={2}>
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
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
        



        <Grid container justifyContent="center">

            <Grid item xs={12} lg={10}>
                <SoftBox display="flex" justifyContent="center" mb={5}>

                  <SoftButton variant="gradient" color="info" size="small" type="submit">
                    Save
                  </SoftButton>
                </SoftBox>

            </Grid>

        </Grid>




      </SoftBox>
    </DashboardLayout>
  );
}

export default CreateStore;
