 
/* eslint-disable react/prop-types */

 

import { useEffect, useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftTagInput from "components/SoftTagInput";
import SoftAlert from "components/SoftAlert";

// settings page components
import FormField from "admin/components/FormField";

// Data
import selectData from "admin/settings/account/components/BasicInfo/data/selectData";

import AuthService from "services/auth-service";


function BasicInfo({ user, isDemo }) {
  const [skills, setSkills] = useState(["react", "angular"]);



  const [info, setInfo] = useState({ name: "", email: "" });
  const [notification, setNotification] = useState({ value: false, color: "info", message: "" });

  useEffect(() => {
    setInfo({
      name: user.name,
      email: user.email,
    });
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

    // validation
    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (info.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (info.email.trim().length === 0 || !info.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    // set new user data for call
    let userData;
    if (isDemo) {
      userData = {
        data: {
          type: "profile",
          attributes: {
            name: info.name,
            profile_image: user.profile_image ?? null,
          },
        },
      };
    } else {
      userData = {
        data: {
          type: "profile",
          attributes: {
            name: info.name,
            email: info.email,
            profile_image: user.profile_image ?? null,
          },
        },
      };
    }

    // call api for update
    await AuthService.updateProfile(JSON.stringify(userData));

    // reset errors
    setErrors({
      nameError: false,
      emailError: false,
    });

    setNotification({
      value: true,
      color: isDemo ? "secondary" : "info",
      message: isDemo
        ? "You can not update the email in demo version"
        : "Your profile has been updated",
    });
  };



  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">Basic Info</SoftTypography>
      </SoftBox>
      <SoftBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          

            <Grid item xs={12} sm={6}>
              <FormField
                label="First Name"
                placeholder="Alec"
                name="name"
                value={info.name}
                onChange={changeHandler}
                error={errors.nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label="Email"
                placeholder="example@email.com"
                inputProps={{ type: "email" }}
                name="email"
                value={info.email}
                onChange={changeHandler}
                error={errors.emailError}
              />
            </Grid>


          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      I&apos;m
                    </SoftTypography>
                  </SoftBox>
                  <SoftSelect placeholder="Male" options={selectData.gender} />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                        <SoftTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          birth date
                        </SoftTypography>
                      </SoftBox>
                      <SoftSelect placeholder="February" options={selectData.birthDate} />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftSelect placeholder={1} options={selectData.days} />
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftSelect placeholder={2021} options={selectData.years} />
                    </SoftBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="confirmation email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField label="your location" placeholder="Sydney, A" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField label="language" placeholder="English" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftBox display="flex" flexDirection="column" justifyContent="flex-end" height="100%">
              <SoftTagInput
                tags={skills}
                placeholder=" "
                onChange={(newSkill) => setSkills(newSkill)}
                removeOnBackspace
              />
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
