import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftSelect from "components/SoftSelect";
import ListActionHeader from "admin/components/ListActionHeader";

import { useQuery } from '@tanstack/react-query';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftEditor from "components/MDEditor";
import SoftTypography from "components/SoftTypography";

// Custom components
import Header from "admin/store/create-store/components/Header";

import Headerskeleton from "admin/store/create-store/components/Header/headerskeleton";

import FormField from "admin/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Address from "components/Address";

// Services
import CrudService from "services/cruds-service";

function DetailStore() {


  const { t } = useTranslation();

  const navigate = useNavigate();

  
   const [data, setData] = useState([]);


   const [storeId, setStoreId] = useState(null);

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
 
   const [selectedCategory, setSelectedCategory] = useState('');
 
 

   const [description, setDescription] = useState({
    value: "",
    error: false,
    textError: "",
  });

 
   const [profileImage, setProfileImage] = useState(null);
   const [backgroundImage, setBackgroundImage] = useState(null);
 
  

  // Fetch store data using React Query
  const { data: storeData, isLoading, error } = useQuery({
    queryKey: ['storeDetail'],
    queryFn: CrudService.getDetailOnlinestore,
  });

  // Use useEffect to set store details when storeData is fetched
  useEffect(() => {
    if (storeData) {
      const storeAttributes = storeData.data[0].attributes;
      const storeId = storeData.data[0].id;
      setName({ text: storeAttributes.name, error: false, textError: "" });
      setPhone({ text: storeAttributes.phone, error: false, textError: "" });
      setEmail({ text: storeAttributes.email, error: false, textError: "" });
      setSelectedCategory(storeAttributes.category || '');
    
      
      setDescription({
        value: storeAttributes.description,
        error: false,
        textError: ""
      });

      setAddress({
        address: {
          value: storeAttributes.address || "",
          error: false,
          textError: "",
        },
        city: {
          value: storeAttributes.city || "",
          error: false,
          textError: "",
        },
        country: {
          value: storeAttributes.country || "",
          error: false,
          textError: "",
        },
        zip: {
          value: storeAttributes.zip || "",
          error: false,
          textError: "",
        },
      });

      
      setProfileImage(storeAttributes.profile_picture || null);
      setBackgroundImage(storeAttributes.picture || null);

      setStoreId(storeId);
    }
  }, [storeData]);

  // Memoize the fetched data to prevent unnecessary re-renders
  const memoizedStoreData = useMemo(() => storeData, [storeData]);


 
   const changeNameHandler = (e) => {
     setName({ ...name, text: e.target.value });
   };
 


  const changeDescriptionHandler = (newText) => {
    console.log("newText:", newText);
  
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
  

 
   const changePhoneHandler = (e) => {
     setPhone({ ...phone, text: e.target.value });
   };
 
   const changeEmailHandler = (e) => {
     setEmail({ ...email, text: e.target.value });
   };
 
   const handleAddressChange = (e) => {
    const { name, value } = e.target;
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: {
        ...prevAddress[name],
        value: value,
        error: value.trim().length === 0 || value.length > 255,
        textError:
          value.trim().length === 0
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
            : value.length > 255
            ? `${name.charAt(0).toUpperCase() + name.slice(1)} cannot exceed 255 characters.`
            : "",
      },
    }));
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


   const [isSubmitting, setIsSubmitting] = useState(false);

 
   const submitHandler = async (e) => {
     e.preventDefault();
 
     setIsSubmitting(true);

 
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
 

     const descNoTags = description.value.replace(/(<([^>]+)>)/gi, "").trim();
     const urlPattern = /(https?:\/\/[^\s]+)/g;
     const imgPattern = /<img\b[^>]*>/i;
   
     // Check if description is empty, contains URLs, or contains image tags
     if (descNoTags.length < 1) {
       setDescription((prevDescription) => ({
         ...prevDescription,
         error: true,
         textError: "The Description must contain text content.",
       }));
       return;
     }
     
     if (urlPattern.test(description.value)) {
       setDescription((prevDescription) => ({
         ...prevDescription,
         error: true,
         textError: "The Description cannot contain URLs.",
       }));
       return;
     }
   
     if (imgPattern.test(description.value)) {
       setDescription((prevDescription) => ({
         ...prevDescription,
         error: true,
         textError: "The Description cannot contain images.",
       }));
       return;
     }
   
 
     if (address.address.value.trim().length < 1 || address.address.value.length > 255) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        address: {
          ...prevAddress.address,
          error: true,
          textError:
            address.address.value.trim().length < 1
              ? "Address is required."
              : "Address cannot exceed 255 characters.",
        },
      }));
      return;
    }
  
    if (address.city.value.trim().length < 1 || address.city.value.length > 255) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        city: {
          ...prevAddress.city,
          error: true,
          textError:
            address.city.value.trim().length < 1
              ? "City is required."
              : "City cannot exceed 255 characters.",
        },
      }));
      return;
    }
  
    if (address.zip.value.trim().length < 1 || address.zip.value.length > 255) {
      setAddress((prevAddress) => ({
        ...prevAddress,
        zip: {
          ...prevAddress.zip,
          error: true,
          textError:
            address.zip.value.trim().length < 1
              ? "ZIP code is required."
              : "ZIP code cannot exceed 255 characters.",
        },
      }));
      return;
    }


     
 
     try {


      let pictureUrl = backgroundImage;

      let profileUrl = profileImage;

  
      
        // Create a new FormData object if either image has changed.
        const formData = new FormData();

        // Check if `backgroundImage` is a file object (indicating it has been changed) and append it if so.
        if (backgroundImage && typeof backgroundImage === 'object') {
          formData.append('attachmentpicture', backgroundImage);
        }

        // Check if `profileImage` is a file object (indicating it has been changed) and append it if so.
        if (profileImage && typeof profileImage === 'object') {
          formData.append('attachmentprofile', profileImage);
        }

        // If at least one image has changed, upload the images.
        if (formData.has('attachmentpicture') || formData.has('attachmentprofile')) {
          const uploadResponse = await CrudService.imageUploadStore(formData);

          // Update the URLs only if new images were uploaded
          if (formData.has('attachmentpicture') && uploadResponse.picturerelativePath) {
            pictureUrl = uploadResponse.picturerelativePath;
          }
          if (formData.has('attachmentprofile') && uploadResponse.profil_picturerelativePath) {
            profileUrl = uploadResponse.profil_picturerelativePath;
          }
        }


        const updatedStore = {
          type: 'stores',
          attributes: {
            name: name.text,
            category: selectedCategory,
            phone: phone.text,
            email: email.text,
            description: description.value,
            address: address.address.value,
            city: address.city.value,
            country: address.country.value,
            zip: address.zip.value,
            profil_picture: profileUrl, // Use the uploaded profile picture URL
            picture: pictureUrl, // Use the uploaded background picture URL
          },
        };


       
        

       await CrudService.updateOnlinestore(updatedStore, storeId);
       navigate("/listing/all", {
         state: { value: true, text: "The Store was successfully created" },
       });
     } catch (err) {
       console.error(err);
       // Handle error
     }


     setIsSubmitting(false);

   };



  const clickDeleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
  
    if (!isConfirmed) {
      // If the user cancels, stop the function execution
      return;
    }
  
    try {
      // Send delete request
      await CrudService.deleteOnlinestore(storeId);
      
      // Navigate after successful deletion
      navigate("/listing/create-listing");
    } catch (error) {
      console.error('Failed to delete listing:', error);
      // You can show an error message here if needed
    }
  };






  const [selectedStatus, setSelectedStatus] = useState(data?.attributes?.status || "");
  const [initialStatus, setInitialStatus] = useState(data?.attributes?.status || "");
  
  // Update the selected status and track changes
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus.value);
  };
  
  // Handle the status update when the save button is clicked
  const handleSave = async () => {
    try {
      const payload = { status: selectedStatus };
      const response = await CrudService.updateStoreStatus(payload, id);
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          attributes: {
            ...prevData.attributes,
            status: selectedStatus,
          },
        }));
        // Reset the initial status to the newly saved status
        setInitialStatus(selectedStatus);
      }
    } catch (error) {
      console.error(`Error updating reservation status to ${selectedStatus}:`, error);
    }
  };





  return (
    <DashboardLayout>
      <SoftBox mt={1} mb={8} component="form" method="POST" onSubmit={submitHandler}>


          <ListActionHeader title="Delete Store" clickAddHandler={clickDeleteHandler} />

          <Grid container spacing={3}>



              <Grid item xs={12} lg={8}>

                  <Grid container justifyContent="center">
                    <Grid item xs={12} lg={12}>





                          {isLoading ? (
                            <Headerskeleton rows={5} columns={5} />  
                          ) : (
                                <Header 
                                profileImage={profileImage} 
                                backgroundImage={backgroundImage}
                                onProfileImageChange={handleProfileImageChange}
                                onBackgroundImageChange={handleBackgroundImageChange}
                              />
                          )}


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

                                      value={{ value: selectedCategory, label: selectedCategory || "Select Category" }}
                                      options={[
                                        
                                        { value: "boats", label: "boats"},
                                        { value: "camions", label: "camions" },
                                        { value: "caravans", label: "caravans"},
                                        { value: "cars", label: "cars"},
                                        { value: "engins", label: "engins"},
                                        { value: "motos", label: "motos"},
                                        { value: "scooters", label: "scooters"},
                                        { value: "taxiaeroports", label: "taxiaeroports" },
                                        { value: "transportations", label: "transportations" },
                                        { value: "velos", label: "velos"},
                                        { value: "apartments", label: "apartments" },
                                        { value: "bureauxs", label: "bureauxs" },
                                        { value: "magasins", label: "magasins" },
                                        { value: "maisons", label: "maisons" },
                                        { value: "riads", label: "riads"},
                                        { value: "terrains", label: "terrains"},
                                        { value: "villas", label: "villas" },
                                        { value: "services", label: "services" },
                                        { value: "jobs", label: "jobs"},
            
                                        { value: "audios", label: "audios" },
                                        { value: "cameras", label: "cameras"},
                                        { value: "chargers", label: "chargers" },
                                        { value: "drones", label: "drones"},
                                        { value: "gamings", label: "gamings" },
                                        { value: "laptops", label: "laptops"},
                                        { value: "lightings", label: "lightings"},
                                        { value: "printers", label: "printers"},
                                        { value: "routers", label: "routers"},
                                        { value: "tablettes", label: "tablettes" },
                                        { value: "electricaltools", label: "electricaltools"},
                                        { value: "ladders", label: "ladders" },
                                        { value: "mechanicaltools", label: "mechanicaltools" },
                                        { value: "powertools", label: "powertools" },
                                        { value: "pressurewashers", label: "pressurewashers" },
                                        { value: "billiards", label: "billiards"},
                                        { value: "boxings", label: "boxings" },
                                        { value: "divings", label: "divings"},
                                        { value: "footballs", label: "footballs" },
                                        { value: "golfs", label: "golfs" },
                                        { value: "huntings", label: "huntings"},
                                        { value: "musculations", label: "musculations" },
                                        { value: "surfs", label: "surfs" },
                                        { value: "tennis", label: "tennis"},
                                        { value: "clothes", label: "clothes" },
                                        { value: "jewelrys", label: "jewelrys"},
                                        { value: "activities", label: "activities"},
                                        { value: "livres", label: "livres" },
                                        { value: "musicals", label: "musicals" },
                                        { value: "furnitures", label: "furnitures" },
                                        { value: "houseappliances", label: "houseappliances" },
                                        { value: "eclairages", label: "eclairages"},
                                        { value: "mobiliers", label: "mobiliers" },
                                        { value: "photographies", label: "photographies" },
                                        { value: "sonorisations", label: "sonorisations" },
                                        { value: "tentes", label: "tentes" }
                                      
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


              </Grid>





              <Grid item xs={12} lg={4}>


                <Grid item xs={12}>
                  <SoftBox mb={3}>



                      <Card sx={{ overflow: "visible", }}>
                        <SoftBox mb={3} sx={{ p: 2 }} >
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Status
                            </SoftTypography>
                          </SoftBox>
                          <SoftSelect
                            
                            value={{ value: selectedStatus, label: selectedStatus || "Select Status" }}

                            options={[
                            
                              { value: "active", label: "Active" },
                              { value: "draft", label: "Draft" },
                              { value: "pending", label: "Pending" },

                            ]}
                            onChange={handleStatusChange}
                          />
                        </SoftBox>

                          {/* Only show the save button if the status has changed */}
                          {selectedStatus !== initialStatus && (
                            <SoftBox mb={2} display="flex" justifyContent="center">
                              <SoftButton onClick={handleSave} variant="gradient" color="info" size="small">
                                save
                              </SoftButton>
                            </SoftBox>
                          )}


                      </Card>





                  </SoftBox>
                </Grid>




              </Grid>





          </Grid>




      </SoftBox>
    </DashboardLayout>
  );
}

export default DetailStore;


