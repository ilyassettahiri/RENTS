

// react-router-dom components
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

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


function Register() {


  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmPassError: false,
    agreeError: false,
    emailTaken: false,
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputs.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 8) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    if (inputs.confirmPass.trim() !== inputs.password.trim()) {
      setErrors({ ...errors, confirmPassError: true });
      return;
    }

    if (inputs.agree === false) {
      setErrors({ ...errors, agreeError: true });
      return;
    }
    // here will be the post action to add a user to the db
    const newUser = { name: inputs.name, email: inputs.email, password: inputs.password };
    const myData = {
      data: {
        type: "users",
        attributes: { ...newUser, password_confirmation: newUser.password },
      },
    };

    try {
      const response = await AuthService.register(myData);
      authContext.login(response.access_token);
    } catch (err) {
      setErrors({ ...errors, emailTaken: true });
      console.error(err);
      return null;
    }

    setInputs({
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      agree: false,
    });

    setErrors({
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmPassError: false,
      agreeError: false,
      emailTaken: false,
    });
  };







  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card sx={{ boxShadow: 3 }}>


          

          
        <SoftBox my={1.5} textAlign="center">

            <SoftTypography  variant="h3" color="dark" fontWeight="bold">
                Sign up
              
            </SoftTypography>

            <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
              <SoftTypography
                component={Link}
                to="/auth/login"
                variant="button"
                color="info"
                fontWeight="bold"
                textGradient
              >
                Sign in
              </SoftTypography>
            </SoftTypography>
        </SoftBox>

        
        <SoftBox pt={2} pb={3} px={3}>


          <SoftBox component="form" role="form" method="submit" onSubmit={submitHandler}>
            <SoftBox mb={2}>
              <SoftInput  placeholder="Name"
              
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={inputs.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                  inputProps={{
                    autoComplete: "name",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                  
                  />

                  {errors.nameError && (
                    <SoftTypography variant="caption" color="error" fontWeight="light">
                      The name can not be empty
                    </SoftTypography>
                  )}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput placeholder="Email"
              
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
            <SoftBox mb={2}>
              <SoftInput placeholder="Password"
              
              
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  name="password"
                  value={inputs.password}
                  onChange={changeHandler}
                  error={errors.passwordError}
                />
                {errors.passwordError && (
                  <SoftTypography variant="caption" color="error" fontWeight="light">
                    The password must be of at least 8 characters
                  </SoftTypography>
                )}
                  
              
            </SoftBox>





            <SoftBox mb={2}>
              <SoftInput placeholder="Confirm Password"
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                name="confirmPass"
                value={inputs.confirmPass}
                onChange={changeHandler}
                error={errors.confirmPassError}
              />
              {errors.confirmPassError && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  The passwords must match
                </SoftTypography>
              )}
            </SoftBox>




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


            <SoftBox mt={3} >
              <SoftButton sx={{  py: 1.8 }} variant="gradient" color="info" fullWidth type="submit">
                sign up
              </SoftButton>
            </SoftBox>
            
          </SoftBox>


        </SoftBox>


        <Separator />



        <SoftBox p={2}  display="flex" justifyContent="center" alignItems="center">

            
            
        <Socials />


        </SoftBox>


      </Card>
    </CoverLayout>
  );
}

export default Register;
