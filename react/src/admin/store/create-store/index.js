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
    address: { value: "", error: false, textError: "" },
    city: { value: "", error: false, textError: "" },
    country: { value: "Morocco", error: false, textError: "" },
    zip: { value: "", error: false, textError: "" },
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

  

  const [selectedCategory, setSelectedCategory] = useState({
    value: "",
    error: false,
    textError: "",
  });

  const [description, setDescription] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

 

  const changeNameHandler = (e) => {
    const newValue = e.target.value;
    setName({
      ...name,
      text: newValue,
      error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
      textError:
        newValue.trim().length < 1
          ? "The Store Name is Required"
          : newValue.length > 255
          ? "The Name cannot exceed 255 characters"
          : /https?:\/\/[^\s]+/.test(newValue)
          ? "The Store Name cannot contain a URL"
          : "",
    });
  };
  
  const changePhoneHandler = (e) => {
    const newValue = e.target.value;
    setPhone({
      ...phone,
      text: newValue,
      error: newValue.trim().length < 1 || !/^\d+$/.test(newValue) || newValue.length < 10 || newValue.length > 15,
      textError:
        newValue.trim().length < 1
          ? "The Phone is required"
          : !/^\d+$/.test(newValue)
          ? "The Phone must contain only numbers"
          : newValue.length < 10 || newValue.length > 15
          ? "The Phone must be between 10 and 15 digits"
          : "",
    });
  };
  
  const changeEmailHandler = (e) => {
    const newValue = e.target.value;
    setEmail({
      ...email,
      text: newValue,
      error: newValue.trim().length < 1 || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newValue),
      textError:
        newValue.trim().length < 1
          ? "The Email is required"
          : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newValue)
          ? "The Email format is invalid"
          : "",
    });
  };
  



  const changeDescriptionHandler = (newText) => {
    
  
    // Regular expressions for URLs and image tags
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const imgPattern = /<img\b[^>]*>/i;
  
    // Check for errors
    const isEmpty = newText.trim().length === 0;
    const isTooLong = newText.length > 1055;
    const containsUrl = urlPattern.test(newText);
    const containsImg = imgPattern.test(newText);
  
    setDescription((prevDescription) => ({
      ...prevDescription,
      value: newText,
      error: isEmpty || isTooLong || containsUrl || containsImg,
      textError: isEmpty
        ? "The Description is required"
        : isTooLong
        ? "The Description cannot exceed 1055 characters"
        : containsUrl
        ? "The Description cannot contain URLs"
        : containsImg
        ? "The Description cannot contain images"
        : "",
    }));
  };
  



  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const urlPattern = /(https?:\/\/[^\s]+)/g; // Regex pattern to detect URLs
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: {
        ...prevAddress[name],
        value: value,
        error:
          value.trim().length === 0 ||
          value.length > 255 ||
          urlPattern.test(value), // Checks if value contains a URL
        textError:
          value.trim().length === 0
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
            : value.length > 255
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} cannot exceed 255 characters.`
            : urlPattern.test(value)
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} cannot contain URLs.`
            : "",
      },
    }));
  };
  
  

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory({
      value: selectedOption.value,
      error: selectedOption.value.trim().length === 0, // Set error if value is empty
      textError: selectedOption.value.trim().length === 0 ? "A category must be selected" : "",
    });
  };
  

  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };


  const [isSubmitting, setIsSubmitting] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);


    const descNoTags = description.value.replace(/(<([^>]+)>)/gi, "").trim();
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const imgPattern = /<img\b[^>]*>/i;

    if (selectedCategory.value.trim().length < 1) {

      setIsSubmitting(false);

      setSelectedCategory((prevCategory) => ({
        ...prevCategory,
        error: true,
        textError: "A category must be selected",
      }));
      return;
    }
    



    if (
      name.text.trim().length < 1 ||
      name.text.length > 255 ||
      urlPattern.test(name.text)
    ) {
      setIsSubmitting(false);
      setName({
        ...name,
        error: true,
        textError:
          name.text.trim().length < 1
            ? "The Store Name is Required."
            : name.text.length > 255
            ? "The Name cannot exceed 255 characters."
            : "The Store Name cannot contain a URL.",
      });
      return;
    }

    

    if (
      phone.text.trim().length < 1 ||
      !/^\d+$/.test(phone.text) ||
      phone.text.length < 10 ||
      phone.text.length > 15
    ) {
      setIsSubmitting(false);
      setPhone({
        ...phone,
        error: true,
        textError:
          phone.text.trim().length < 1
            ? "The Phone is required."
            : !/^\d+$/.test(phone.text)
            ? "The Phone must contain only numbers."
            : "The Phone must be between 10 and 15 digits.",
      });
      return;
    }

    


    if (
      email.text.trim().length < 1 ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.text) ||
      urlPattern.test(email.text)
    ) {
      setIsSubmitting(false);
      setEmail({
        ...email,
        error: true,
        textError:
          email.text.trim().length < 1
            ? "The Email is required."
            : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.text)
            ? "The Email format is invalid."
            : "The Email cannot contain URLs.",
      });
      return;
    }
    
    


    if (
      descNoTags.length < 1 ||
      urlPattern.test(description.value) ||
      imgPattern.test(description.value)
    ) {
      setIsSubmitting(false);
      setDescription((prevDescription) => ({
        ...prevDescription,
        error: true,
        textError:
          descNoTags.length < 1
            ? "The Description must contain text content."
            : urlPattern.test(description.value)
            ? "The Description cannot contain URLs."
            : "The Description cannot contain images.",
      }));
      return;
    }
    
  



      // Check for Address
      if (
        address.address.value.trim().length < 1 ||
        address.address.value.length > 255 ||
        urlPattern.test(address.address.value)
      ) {
        setIsSubmitting(false);
        setAddress((prevAddress) => ({
          ...prevAddress,
          address: {
            ...prevAddress.address,
            error: true,
            textError:
              address.address.value.trim().length < 1
                ? "Address is required."
                : address.address.value.length > 255
                ? "Address cannot exceed 255 characters."
                : "Address cannot contain URLs.",
          },
        }));
        return;
      }

      // Check for City
      if (
        address.city.value.trim().length < 1 ||
        address.city.value.length > 255 ||
        urlPattern.test(address.city.value)
      ) {
        setIsSubmitting(false);
        setAddress((prevAddress) => ({
          ...prevAddress,
          city: {
            ...prevAddress.city,
            error: true,
            textError:
              address.city.value.trim().length < 1
                ? "City is required."
                : address.city.value.length > 255
                ? "City cannot exceed 255 characters."
                : "City cannot contain URLs.",
          },
        }));
        return;
      }

      // Check for ZIP code
      if (
        address.zip.value.trim().length < 1 ||
        address.zip.value.length > 255 ||
        urlPattern.test(address.zip.value)
      ) {
        setIsSubmitting(false);
        setAddress((prevAddress) => ({
          ...prevAddress,
          zip: {
            ...prevAddress.zip,
            error: true,
            textError:
              address.zip.value.trim().length < 1
                ? "ZIP code is required."
                : address.zip.value.length > 255
                ? "ZIP code cannot exceed 255 characters."
                : "ZIP code cannot contain URLs.",
          },
        }));
        return;
      }


    const formData = new FormData();
    formData.append("data[attributes][name]", name.text);
    formData.append('data[attributes][category]', selectedCategory.value);

    formData.append("data[attributes][phone]", phone.text);

    formData.append("data[attributes][email]", email.text);

    formData.append("data[attributes][description]", description.value);
    formData.append("data[attributes][address]", address.address.value);
    formData.append("data[attributes][city]", address.city.value);
    formData.append("data[attributes][country]", address.country.value);
    formData.append("data[attributes][zip]", address.zip.value);

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
      setIsSubmitting(false);

      console.error(err);
      // Handle error
    }

    setIsSubmitting(false);

  };

  return (
    <DashboardLayout>
      <SoftBox mt={1} mb={8} component="form" method="POST" onSubmit={submitHandler}>
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
                <SoftBox >
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
                            Category <span style={{ color: "red",}}> * </span>
                          </SoftTypography>
                        </SoftBox>
                        
                          <SoftSelect

                            placeholder="Select Category"
                            options={[
                            
                              { value: "boats", label: "Boats" },
                              { value: "trucks", label: "Trucks" },
                              { value: "caravans", label: "Caravans" },
                              { value: "cars", label: "Cars" },
                              { value: "engins", label: "Engins" },
                              { value: "motorcycles", label: "Motorcycles" },
                              { value: "scooters", label: "Scooters" },
                              { value: "airport-taxis", label: "Airport Taxis" },
                              { value: "transportation", label: "Transportation"},
                              { value: "bicycles", label: "Bicycles"},
                              { value: "apartments", label: "Apartments"},
                              { value: "offices", label: "Offices"},
                              { value: "shops", label: "Shops" },
                              { value: "houses", label: "Houses" },
                              { value: "riads", label: "Riads"},
                              { value: "lands", label: "Lands"},
                              { value: "villas", label: "Villas"},
                              { value: "services", label: "Services"},
                              { value: "jobs", label: "Jobs" },
  
                              { value: "audio", label: "Audio"},
                              { value: "cameras", label: "Cameras" },
                              { value: "chargers", label: "Chargers"},
                              { value: "drones", label: "Drones"},
                              { value: "gaming", label: "Gaming"},
                              { value: "laptops", label: "Laptops"},
                              { value: "lighting", label: "Lighting" },
                              { value: "printers", label: "Printers"},
                              { value: "routers", label: "Routers" },
                              { value: "tablets", label: "Tablets" },
                              { value: "electrical-tools", label: "Electrical Tools" },
                              { value: "ladders", label: "Ladders"},
                              { value: "mechanical-tools", label: "Mechanical Tools"},
                              { value: "power-tools", label: "Power Tools" },
                              { value: "pressure-washers", label: "Pressure Washers" },
                              { value: "billiard", label: "Billiard"},
                              { value: "boxing", label: "Boxing"},
                              { value: "diving", label: "Diving"},
                              { value: "football", label: "Football" },
                              { value: "golf", label: "Golf"},
                              { value: "hunting", label: "Hunting" },
                              { value: "gym", label: "Gym" },
                              { value: "surf", label: "Surf" },
                              { value: "tennis", label: "Tennis" },
                              { value: "clothes", label: "Clothes" },
                              { value: "jewelry", label: "Jewelry"},
                              { value: "activities", label: "Activities"},
                              { value: "books", label: "Books"},
                              { value: "musical", label: "Musical" },
                              { value: "furniture", label: "Furniture" },
                              { value: "home-appliances", label: "Home Appliances" },
                              { value: "eclairage", label: "Eclairage"},
                              { value: "mobilier", label: "Mobilier" },
                              { value: "photography", label: "Photography" },
                              { value: "sound-systems", label: "Sound Systems" },
                              { value: "tents", label: "Tents" }
                            ]}




                            onChange={handleCategoryChange}

                            error={selectedCategory.error}
                          />

                          {selectedCategory.error && (
                            <SoftTypography variant="caption" color="error" fontWeight="light">
                              {selectedCategory.textError}
                            </SoftTypography>
                          )}

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
                          placeholder="0611111111"
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
                        Description <span style={{ color: "red",}}> * </span>
                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor 

                        value={description.value}
                        onChange={changeDescriptionHandler}
                        


                    />
                    {description.error && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {description.textError}
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

                  <SoftButton sx={{ py: 1.5 }} variant="gradient" color="info" size="small" type="submit"
                  
                  disabled={isSubmitting}
                  
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </SoftButton>
                </SoftBox>

            </Grid>

        </Grid>




      </SoftBox>
    </DashboardLayout>
  );
}

export default CreateStore;
