/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftAlert from "components/SoftAlert";
import SoftDatePicker from "components/SoftDatePicker";
import SoftButton from "components/SoftButton";
import FormField from "admin/components/FormField";
import AuthService from "services/auth-service";
import CrudService from "services/cruds-service";

function BasicInfo({ user }) {




      const [userId, setUserId] = useState(null);

      const [name, setName] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [firstName, setFirstName] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [lastName, setLastName] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [email, setEmail] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [phoneNumber, setPhoneNumber] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [birthday, setBirthday] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [gender, setGender] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [streetAddress, setStreetAddress] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [zipCode, setZipCode] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [city, setCity] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [country, setCountry] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [oldPassword, setOldPassword] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [newPassword, setNewPassword] = useState({
        text: "",
        error: false,
        textError: "",
      });

      const [confirmNewPassword, setConfirmNewPassword] = useState({
        text: "",
        error: false,
        textError: "",
      });


  
  
      const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

      useEffect(() => {
        if (notification.value === true) {
          let timer = setTimeout(() => {
            setNotification({ value: false, color: "info", message: "" });
          }, 5000);
        }
      }, [notification]);

      

      useEffect(() => {
        if (!user) return;
      
        setUserId(user.id);
      
        setName({
          text: user.name || "",
          error: false,
          textError: "",
        });
      
        setFirstName({
          text: user.firstName || "",
          error: false,
          textError: "",
        });
      
        setLastName({
          text: user.lastName || "",
          error: false,
          textError: "",
        });
      
        setEmail({
          text: user.emailAddress || "",
          error: false,
          textError: "",
        });
      
        setPhoneNumber({
          text: user.phoneNumber || "",
          error: false,
          textError: "",
        });
      
        setBirthday({
          text: user.birthday || "",
          error: false,
          textError: "",
        });
      
        setGender({
          text: user.gender || "",
          error: false,
          textError: "",
        });
      
        setStreetAddress({
          text: user.streetAddress || "",
          error: false,
          textError: "",
        });
      
        setZipCode({
          text: user.zipCode || "",
          error: false,
          textError: "",
        });
      
        setCity({
          text: user.city || "",
          error: false,
          textError: "",
        });
      
        setCountry({
          text: user.country || "",
          error: false,
          textError: "",
        });
      
        setOldPassword({
          text: user.oldPassword || "",
          error: false,
          textError: "",
        });
      
        setNewPassword({
          text: user.newPassword || "",
          error: false,
          textError: "",
        });
      
        setConfirmNewPassword({
          text: user.confirmNewPassword || "",
          error: false,
          textError: "",
        });
      }, [user]);
      



      const changeNameHandler = (e) => {
        const newValue = e.target.value;
        setName({
          ...name,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The Name is required."
              : newValue.length > 255
              ? "The Name cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The Name cannot contain a URL."
              : "",
        });
      };
      
      const changeFirstNameHandler = (e) => {
        const newValue = e.target.value;
        setFirstName({
          ...firstName,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The First Name is required."
              : newValue.length > 255
              ? "The First Name cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The First Name cannot contain a URL."
              : "",
        });
      };
      
      const changeLastNameHandler = (e) => {
        const newValue = e.target.value;
        setLastName({
          ...lastName,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The Last Name is required."
              : newValue.length > 255
              ? "The Last Name cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The Last Name cannot contain a URL."
              : "",
        });
      };
      
      const changeEmailHandler = (e) => {
        const newValue = e.target.value;
        setEmail({
          ...email,
          text: newValue,
          error: newValue.trim().length < 1 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The Email is required."
              : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)
              ? "The Email format is invalid."
              : "",
        });
      };
      
      const changePhoneNumberHandler = (e) => {
        const newValue = e.target.value;
        setPhoneNumber({
          ...phoneNumber,
          text: newValue,
          error: newValue.trim().length < 1 || !/^\d+$/.test(newValue) || newValue.length < 10 || newValue.length > 15,
          textError:
            newValue.trim().length < 1
              ? "The Phone Number is required."
              : !/^\d+$/.test(newValue)
              ? "The Phone Number must contain only numbers."
              : newValue.length < 10 || newValue.length > 15
              ? "The Phone Number must be between 10 and 15 digits."
              : "",
        });
      };
      
      const changeStreetAddressHandler = (e) => {
        const newValue = e.target.value;
        setStreetAddress({
          ...streetAddress,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The Street Address is required."
              : newValue.length > 255
              ? "The Street Address cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The Street Address cannot contain a URL."
              : "",
        });
      };
      
      const changeCityHandler = (e) => {
        const newValue = e.target.value;
        setCity({
          ...city,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The City is required."
              : newValue.length > 255
              ? "The City cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The City cannot contain a URL."
              : "",
        });
      };
      
      const changeZipCodeHandler = (e) => {
        const newValue = e.target.value;
        setZipCode({
          ...zipCode,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255,
          textError:
            newValue.trim().length < 1
              ? "The Zip Code is required."
              : newValue.length > 255
              ? "The Zip Code cannot exceed 255 characters."
              : "",
        });
      };
      
      const changeCountryHandler = (e) => {
        const newValue = e.target.value;
        setCountry({
          ...country,
          text: newValue,
          error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
          textError:
            newValue.trim().length < 1
              ? "The Country is required."
              : newValue.length > 255
              ? "The Country cannot exceed 255 characters."
              : /https?:\/\/[^\s]+/.test(newValue)
              ? "The Country cannot contain a URL."
              : "",
        });
      };
      
      const changeGenderHandler = (selectedOption) => {
        setGender({
          ...gender,
          text: selectedOption.value,
          error: selectedOption.value.trim().length < 1,
          textError: selectedOption.value.trim().length < 1 ? "The Gender is required." : "",
        });
      };
      
      const changeBirthdayHandler = (date) => {
        const formattedDate = date ? date[0] : "";
        setBirthday({
          ...birthday,
          text: formattedDate,
          error: !formattedDate,
          textError: !formattedDate ? "The Birthday is required." : "",
        });
      };
      
      const changePasswordHandler = (e) => {
        const newValue = e.target.value;
        setNewPassword({
          ...newPassword,
          text: newValue,
          error: newValue.trim().length < 6 || newValue.length > 255,
          textError:
            newValue.trim().length < 6
              ? "The Password must be at least 6 characters long."
              : newValue.length > 255
              ? "The Password cannot exceed 255 characters."
              : "",
        });
      };
      
      const changeConfirmPasswordHandler = (e) => {
        const newValue = e.target.value;
        setConfirmNewPassword({
          ...confirmNewPassword,
          text: newValue,
          error: newValue !== newPassword.text,
          textError: newValue !== newPassword.text ? "Passwords do not match." : "",
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




  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e) => {
      e.preventDefault();

      setIsSubmitting(true);



        // Name validation
      if (name.text.trim().length === 0 || name.text.length > 255 || /https?:\/\/[^\s]+/.test(name.text)) {
        setName({
          ...name,
          error: true,
          textError:
            name.text.trim().length === 0
              ? "The Name is required."
              : name.text.length > 255
              ? "The Name cannot exceed 255 characters."
              : "The Name cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setName({ ...name, error: false, textError: "" });
      }

      // First Name validation
      if (firstName.text.trim().length === 0 || firstName.text.length > 255 || /https?:\/\/[^\s]+/.test(firstName.text)) {
        setFirstName({
          ...firstName,
          error: true,
          textError:
            firstName.text.trim().length === 0
              ? "The First Name is required."
              : firstName.text.length > 255
              ? "The First Name cannot exceed 255 characters."
              : "The First Name cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setFirstName({ ...firstName, error: false, textError: "" });
      }

      // Last Name validation
      if (lastName.text.trim().length === 0 || lastName.text.length > 255 || /https?:\/\/[^\s]+/.test(lastName.text)) {
        setLastName({
          ...lastName,
          error: true,
          textError:
            lastName.text.trim().length === 0
              ? "The Last Name is required."
              : lastName.text.length > 255
              ? "The Last Name cannot exceed 255 characters."
              : "The Last Name cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setLastName({ ...lastName, error: false, textError: "" });
      }

      // Email validation
      const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.text.trim().length === 0 || !mailFormat.test(email.text)) {
        setEmail({
          ...email,
          error: true,
          textError:
            email.text.trim().length === 0
              ? "The Email is required."
              : "The Email format is invalid.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setEmail({ ...email, error: false, textError: "" });
      }

      // Phone Number validation
      if (
        phoneNumber.text.trim().length === 0 ||
        !/^\d+$/.test(phoneNumber.text) ||
        phoneNumber.text.length < 10 ||
        phoneNumber.text.length > 15
      ) {
        setPhoneNumber({
          ...phoneNumber,
          error: true,
          textError:
            phoneNumber.text.trim().length === 0
              ? "The Phone Number is required."
              : !/^\d+$/.test(phoneNumber.text)
              ? "The Phone Number must contain only numbers."
              : "The Phone Number must be between 10 and 15 digits.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setPhoneNumber({ ...phoneNumber, error: false, textError: "" });
      }

      // Street Address validation
      if (
        streetAddress.text.trim().length === 0 ||
        streetAddress.text.length > 255 ||
        /https?:\/\/[^\s]+/.test(streetAddress.text)
      ) {
        setStreetAddress({
          ...streetAddress,
          error: true,
          textError:
            streetAddress.text.trim().length === 0
              ? "The Street Address is required."
              : streetAddress.text.length > 255
              ? "The Street Address cannot exceed 255 characters."
              : "The Street Address cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setStreetAddress({ ...streetAddress, error: false, textError: "" });
      }

      // City validation
      if (city.text.trim().length === 0 || city.text.length > 255 || /https?:\/\/[^\s]+/.test(city.text)) {
        setCity({
          ...city,
          error: true,
          textError:
            city.text.trim().length === 0
              ? "The City is required."
              : city.text.length > 255
              ? "The City cannot exceed 255 characters."
              : "The City cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setCity({ ...city, error: false, textError: "" });
      }

      // Zip Code validation
      if (zipCode.text.trim().length === 0 || zipCode.text.length > 255) {
        setZipCode({
          ...zipCode,
          error: true,
          textError:
            zipCode.text.trim().length === 0
              ? "The Zip Code is required."
              : "The Zip Code cannot exceed 255 characters.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setZipCode({ ...zipCode, error: false, textError: "" });
      }

      // Country validation
      if (country.text.trim().length === 0 || country.text.length > 255 || /https?:\/\/[^\s]+/.test(country.text)) {
        setCountry({
          ...country,
          error: true,
          textError:
            country.text.trim().length === 0
              ? "The Country is required."
              : country.text.length > 255
              ? "The Country cannot exceed 255 characters."
              : "The Country cannot contain a URL.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setCountry({ ...country, error: false, textError: "" });
      }

      // Birthday validation
      if (!birthday.text || new Date(birthday.text) > new Date()) {
        setBirthday({
          ...birthday,
          error: true,
          textError: !birthday.text
            ? "The Birthday is required."
            : "The Birthday cannot be in the future.",
        });
        setIsSubmitting(false);
        return;
      } else {
        setBirthday({ ...birthday, error: false, textError: "" });
      }

    


    try {
      const data = {
        firstName: firstName.text,
        lastName: lastName.text,
        emailAddress: email.text,
        phoneNumber: phoneNumber.text,
        birthday: birthday.text ? format(new Date(birthday.text), 'yyyy-MM-dd') : null,
        gender: gender.text,
        streetAddress: streetAddress.text,
        zipCode: zipCode.text,
        city: city.text,
        country: country.text,
      };
      

      await CrudService.updateUser(data, userId);

      setNotification({
        value: true,
        color: "info",
        message: "Your profile has been updated",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }

    setIsSubmitting(false);

  };

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Basic Info</SoftTypography>
      </SoftBox>
      <SoftBox pb={3} px={3} component="form" onSubmit={submitHandler} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="First Name"
              placeholder="First Name"
              name="firstName"
              value={firstName.text}
              onChange={changeFirstNameHandler}
              error={firstName.error}
            />

              {firstName.error && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {firstName.textError}
                </SoftTypography>
              )}


          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Last Name"
              placeholder="Last Name"
              inputProps={{ type: "lastName" }}
              name="lastName"
              value={lastName.text}
              onChange={changeLastNameHandler}
              error={lastName.error}
            />



              {lastName.error && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {lastName.textError}
                </SoftTypography>
              )}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      I&apos;m
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect
                    placeholder="Male"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    value={{ value: gender.text, label: gender.text.charAt(0).toUpperCase() + gender.text.slice(1) }}
                    onChange={(selectedOption) => setGender({ ...gender, text: selectedOption.value })}
                    error={gender.error}
                  />


                    {gender.error && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {gender.textError}
                      </SoftTypography>
                    )}

                </SoftBox>
              </Grid>

              <Grid item xs={12} sm={6}>
                <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      Birthday
                    </SoftTypography>
                  </SoftBox>
                  <SoftDatePicker
                      input={{
                        placeholder: "Select a date",
                        value: birthday.text ? format(new Date(birthday.text), "MM/dd/yyyy") : "",
                      }}
                      onChange={(date) => setBirthday({ ...birthday, text: date[0] })}
                      error={birthday.error}                  

                  />


                      {birthday.error && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {birthday.textError}
                        </SoftTypography>
                      )}
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              name="email"
              value={email.text}
              onChange={changeEmailHandler}
              error={email.error}
            />


              {email.error && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {email.textError}
                </SoftTypography>
              )}


          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Confirmation Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label=" Address"
              placeholder="Address"
              name="streetAddress"
              value={streetAddress.text}
              onChange={changeStreetAddressHandler}
              error={streetAddress.error}
            />


              {streetAddress.error && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {streetAddress.textError}
                </SoftTypography>
              )}


          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Phone"
              placeholder="06 35 63 16 20"
              inputProps={{ type: "tel" }}
              name="phoneNumber"
              value={phoneNumber.text}
              onChange={changePhoneHandler}
              error={phoneNumber.error}
            />



                {phoneNumber.error && (
                  <SoftTypography variant="caption" color="error" fontWeight="light">
                    {phoneNumber.textError}
                  </SoftTypography>
                )}

          </Grid>

          <Grid item xs={12} sm={5}>
            <FormField
              label="City"
              placeholder="New York"
              name="city"
              value={city.text}
              onChange={changeCityHandler}
              error={city.error}
            />


                {city.error && (
                  <SoftTypography variant="caption" color="error" fontWeight="light">
                    {city.textError}
                  </SoftTypography>
                )}


          </Grid>
          <Grid item xs={12} md={2}>
            <FormField
              label="Zip Code"
              placeholder="12345"
              name="zipCode"
              value={zipCode.text}
              onChange={changeZipCodeHandler}
              error={zipCode.error}
            />


              {zipCode.error && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {zipCode.textError}
                </SoftTypography>
              )}


          </Grid>
          <Grid item xs={12} sm={5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
              Country <span style={{ color: "red",}}> * </span>
            </SoftTypography>
            <SoftSelect
              label="Country"
              placeholder="United States"
              options={[
                { value: "USA", label: "United States" },
                { value: "CAN", label: "Canada" },
                { value: "MR", label: "Morocco" },
                // Add other countries as needed
              ]}
              value={{ value: country.text, label: country.text }}
              onChange={(selectedOption) => setCountry({ ...country, text: selectedOption.value })}
              error={country.error}
            />


                {country.error && (
                  <SoftTypography variant="caption" color="error" fontWeight="light">
                    {country.textError}
                  </SoftTypography>
                )}


          </Grid>
        </Grid>
        <Grid item xs={12} mt={8}>
          <Grid container spacing={3}>
            <SoftBox ml="auto" display="flex" flexDirection="column">
              <SoftButton sx={{ py: 1.5 }} variant="gradient" color="info" size="small" type="submit"
              
              disabled={isSubmitting}
              >
                
                {isSubmitting ? "Saving..." : "Save changes"}
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
      {notification.value === true && (
        <SoftAlert color={notification.color} mt="20px">
          <SoftTypography variant="body2" color="white">
            {notification.message}
          </SoftTypography>
        </SoftAlert>
      )}
    </Card>
  );
}

export default BasicInfo;
