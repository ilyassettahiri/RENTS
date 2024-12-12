

// react-router-dom components
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FormField from "admin/components/FormFieldCollap";
import SoftSelect from "components/SoftSelect";
import { useNavigate } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CrudService from "services/cruds-service";

// Authentication layout components
import CoverLayout from "auth/components/CoverLayout";
import Socials from "auth/components/Socials";
import Separator from "auth/components/Separator";

import { AuthContext } from "context";
import AuthService from "services/auth-service";
import { InputLabel } from "@mui/material";

// Images

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const curved6 = `${imagePath}/curved-images/curved9.jpg`;

export {
  curved6
};


function Loginseller() {
  const { t } = useTranslation();


  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    
    agree: false,
    
    firstName: "",
    lastName: "",
    streetAddress: "",
    phoneNumber: "",
    city: "",
    zipCode: "",
    country: "Morocco",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
   
    agreeError: false,
    emailTaken: false,
    
    firstNameError: false,
    lastNameError: false,
    streetAddressError: false,
    phoneNumberError: false,
    cityError: false,
    zipCodeError: false,
    countryError: false,
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };


  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem("sellerEmail");
    if (storedEmail) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        email: storedEmail,
      }));
    }
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlPattern = /(https?:\/\/[^\s]+)/;

    

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setIsSubmitting(false);

      setErrors({ ...errors, emailError: true });
      return;
    }

   

    if (inputs.agree === false) {
      setIsSubmitting(false);

      setErrors({ ...errors, agreeError: true });
      return;
    }


    if (inputs.firstName.trim().length === 0 || inputs.firstName.length > 255) {
      setIsSubmitting(false);
      setErrors({ ...errors, firstNameError: true });
      return;
    }
    
    if (inputs.lastName.trim().length === 0 || inputs.lastName.length > 255) {
      setIsSubmitting(false);
      setErrors({ ...errors, lastNameError: true });
      return;
    }
    
    if (inputs.streetAddress.trim().length === 0 || inputs.streetAddress.length > 255) {
      setIsSubmitting(false);
      setErrors({ ...errors, streetAddressError: true });
      return;
    }
    
    if (inputs.phoneNumber.trim().length === 0 || inputs.phoneNumber.length > 15) {
      setIsSubmitting(false);
      setErrors({ ...errors, phoneNumberError: true });
      return;
    }
    
    if (inputs.city.trim().length === 0 || inputs.city.length > 100) {
      setIsSubmitting(false);
      setErrors({ ...errors, cityError: true });
      return;
    }
    
    if (inputs.zipCode.trim().length === 0 || !/^\d+$/.test(inputs.zipCode)) {
      setIsSubmitting(false);
      setErrors({ ...errors, zipCodeError: true });
      return;
    }
    
    if (inputs.country.trim().length === 0) {
      setIsSubmitting(false);
      setErrors({ ...errors, countryError: true });
      return;
    }

    const fullName = `${inputs.firstName.trim()} ${inputs.lastName.trim()}`;
    const userId = localStorage.getItem("userID");

    
    // here will be the post action to add a user to the db
    const newUser = {
      name: fullName,
      email: inputs.email,
      
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      streetAddress: inputs.streetAddress,
      phoneNumber: inputs.phoneNumber,
      city: inputs.city,
      zipCode: inputs.zipCode,
      country: inputs.country,
    };

    const myData = {
      data: {
        type: "users",
        attributes: { 
          ...newUser, 
          
        },
      },
    };



    try {
      
      await CrudService.becomeSeller(myData, userId);
      
      navigate("/dashboard");

    } catch (err) {
      setIsSubmitting(false);

      setErrors({ ...errors, emailTaken: true });
      console.error(err);
      return null;
    }

    setInputs({
      name: "",
      
      
      
      agree: false,
      firstName: "",
      lastName: "",
      streetAddress: "",
      phoneNumber: "",
      city: "",
      zipCode: "",
      
    });
    
    setErrors({
      nameError: false,
      emailError: false,
      
      agreeError: false,
      
      firstNameError: false,
      lastNameError: false,
      streetAddressError: false,
      phoneNumberError: false,
      cityError: false,
      zipCodeError: false,
      countryError: false,
    });
    


    setIsSubmitting(false);


  };







  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card sx={{ boxShadow: 3 }}>


          

        <SoftBox p={3} textAlign="center">
          <SoftTypography variant="h6" color="text" fontWeight="medium">
            Enter your information below to become a seller and start using seller features.
          </SoftTypography>
        </SoftBox>



        




        
        <SoftBox  px={3} py={5}>


            <SoftBox component="form" role="form" method="submit" onSubmit={submitHandler}>
              

              <Grid container spacing={3}>




                  <Grid item xs={12} sm={6}>
                    <FormField
                      
                      placeholder={t("First Name")}
                      name="firstName"
                      value={inputs.firstName}
                      onChange={changeHandler}
                      error={errors.firstNameError}
                    />

                      {errors.firstNameError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {t("First name is required and should not exceed 255 characters.")}
                        </SoftTypography>
                      )}


                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      
                      placeholder={t("Last Name")}
                      inputProps={{ type: "lastName" }}
                      name="lastName"
                      value={inputs.lastName}
                      onChange={changeHandler}
                      error={errors.lastNameError}
                    />



                      {errors.firstNameError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {t("Last name is required and should not exceed 255 characters.")}
                        </SoftTypography>
                      )}
                  </Grid>





                  <Grid item xs={12} sm={12}>
                      <SoftBox mb={2}>
                        <SoftInput placeholder="Email Address"
                        
                            type="email"
                            label="Email"
                            variant="standard"
                            fullWidth
                            name="email"
                            value={inputs.email}
                            onChange={changeHandler}
                            error={errors.emailError}
                            inputProps={{
                              autoComplete: "email",
                              form: {
                                autoComplete: "off",
                              },
                            }}
                          />
                          {errors.emailError && (
                            <SoftTypography variant="caption" color="error" fontWeight="light">
                              The email must be valid
                            </SoftTypography>
                          )}
                      </SoftBox>
                  </Grid>

                  







                  <Grid item xs={12} sm={8}>
                    <FormField
                      
                      placeholder={t("Address")}
            
                      name="streetAddress"
                      value={inputs.streetAddress}
                      onChange={changeHandler}
                      error={errors.streetAddressError}
                    />


                      {errors.streetAddressError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {t("Address is required and should not exceed 255 characters.")}
                        </SoftTypography>
                      )}


                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormField
                      
                      placeholder="Phone Number"
                      inputProps={{ type: "tel" }}
                      name="phoneNumber"
                      value={inputs.phoneNumber}
                      onChange={changeHandler}
                      error={errors.phoneNumberError}
                    />



                        {errors.phoneNumberError && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {t("Phone number is required and should not exceed 15 number.")}
                          </SoftTypography>
                        )}

                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormField
                      
                      placeholder="City"
                      name="city"
                      value={inputs.city}
                      onChange={changeHandler}
                      error={errors.cityError}
                    />


                        {errors.cityError && (
                          <SoftTypography variant="caption" color="error" fontWeight="light">
                            {t("City is required and should not exceed 255 characters.")}
                          </SoftTypography>
                        )}


                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormField
                      
                      placeholder="Zip Code"
                      name="zipCode"
                      value={inputs.zipCode}
                      onChange={changeHandler}
                      error={errors.zipCodeError}
                    />


                      {errors.zipCodeError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {t("Zip Code is required and should not exceed 255 characters.")}
                        </SoftTypography>
                      )}


                  </Grid>
                  

                  <Grid item xs={12} sm={4}>
                    
                    <SoftSelect
                      label={t("Country")}
                      placeholder={t("Country")}
                      options={[
                        { value: "United States", label: "United States" },
                        { value: "Canada", label: "Canada" },
                        { value: "Morocco", label: "Morocco" },
                        // Add other countries as needed
                      ]}
                      value={inputs.country ? { value: inputs.country, label: inputs.country } : null}
                      onChange={(selectedOption) =>
                        setInputs((prevInputs) => ({
                          ...prevInputs,
                          country: selectedOption ? selectedOption.value : "",
                        }))
                      }
                      error={errors.countryError}
                    />
                    {errors.countryError && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {t("Please select a valid country.")}
                      </SoftTypography>
                    )}
                  </Grid>









                  <Grid item xs={12} sm={12}>


                      <SoftBox display="flex" alignItems="center">
                        <Checkbox name="agree" id="agree"  onChange={changeHandler} />
                        <SoftTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          sx={{  cursor: "pointer" }}
                          htmlFor="agree"
                        >
                          &nbsp;&nbsp;I agree the&nbsp;
                        </SoftTypography>
                        <SoftTypography
                          component="a"
                          href="#"
                          variant="button"
                          fontWeight="bold"
                          textGradient
                        >
                          Terms and Conditions
                        </SoftTypography>
                      </SoftBox>
                  </Grid>


                      {errors.agreeError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          You must agree to the Terms and Conditions
                        </SoftTypography>
                      )}
                      {errors.emailTaken && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          The email address has already been taken
                        </SoftTypography>
                      )}

                  <Grid item xs={12} sm={12}>

                      <SoftBox mt={3} >
                        <SoftButton sx={{  py: 1.8 }} variant="gradient" color="info" fullWidth type="submit"
                        
                        disabled={isSubmitting}

                        
                        >
                          

                          {isSubmitting ? "Saving..." : "Start Selling"}
                        </SoftButton>
                      </SoftBox>

                  </Grid>

              </Grid>

              
            </SoftBox>


        </SoftBox>









        


      </Card>
    </CoverLayout>
  );
}

export default Loginseller;
