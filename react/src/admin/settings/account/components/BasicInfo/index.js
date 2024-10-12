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
  const [info, setInfo] = useState({
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    gender: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    setInfo({
      id: user.id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddress,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      gender: user.gender,
      streetAddress: user.streetAddress,
      zipCode: user.zipCode,
      city: user.city,
      country: user.country,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword,
      confirmNewPassword: user.confirmNewPassword,
    });
    setUserId(user.id);
  }, [user]);

  useEffect(() => {
    if (notification.value === true) {
      let timer = setTimeout(() => {
        setNotification({ value: false, color: "info", message: "" });
      }, 5000);
    }
  }, [notification]);

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
  });

  const changeHandler = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (info.firstName.trim().length === 0 || info.lastName.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (info.email.trim().length === 0 || !info.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    try {
      const data = {
        firstName: info.firstName,
        lastName: info.lastName,
        emailAddress: info.email,
        phoneNumber: info.phoneNumber,
        birthday: info.birthday ? format(new Date(info.birthday), 'yyyy-MM-dd') : null,
        gender: info.gender,
        streetAddress: info.streetAddress,
        zipCode: info.zipCode,
        city: info.city,
        country: info.country,
      };

      await CrudService.updateUser(data, info.id);

      setNotification({
        value: true,
        color: "info",
        message: "Your profile has been updated",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
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
              placeholder="Alec"
              name="firstName"
              value={info.firstName}
              onChange={changeHandler}
              error={errors.nameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Last Name"
              placeholder="Last Name"
              inputProps={{ type: "lastName" }}
              name="lastName"
              value={info.lastName}
              onChange={changeHandler}
              error={errors.emailError}
            />
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
                    value={
                      info.gender
                        ? { value: info.gender, label: info.gender.charAt(0).toUpperCase() + info.gender.slice(1) }
                        : { value: "", label: "Select Gender" } // Provide a default value when gender is null or undefined
                    }                    
                    onChange={(selectedOption) => setInfo({ ...info, gender: selectedOption.value })}
                  />
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
                      value: info.birthday ? format(new Date(info.birthday), 'MM/dd/yyyy') : '',
                    }}
                    onChange={(date) => setInfo({ ...info, birthday: date[0] })}
                  />
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
              value={info.email}
              onChange={changeHandler}
              error={errors.nameError}
            />
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
              label="Street Address"
              placeholder="123 Main St"
              name="streetAddress"
              value={info.streetAddress}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Phone Number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "tel" }}
              name="phoneNumber"
              value={info.phoneNumber}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <FormField
              label="City"
              placeholder="New York"
              name="city"
              value={info.city}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormField
              label="Zip Code"
              placeholder="12345"
              name="zipCode"
              value={info.zipCode}
              onChange={changeHandler}
            />
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
              value={{ value: info.country, label: info.country }}
              onChange={(selectedOption) => setInfo({ ...info, country: selectedOption.value })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} mt={8}>
          <Grid container spacing={3}>
            <SoftBox ml="auto" display="flex" flexDirection="column">
              <SoftButton sx={{ py: 1.5 }} variant="gradient" color="info" size="small" type="submit">
                save changes
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
