import axios from 'axios';


import { useContext, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

import AuthService from "services/auth-service";
import { AuthContext } from "context";



// Authentication layout components
import BasicLayout from "auth/components/BasicLayout";
import Socials from "auth/components/Socials";
import Separator from "auth/components/Separator";

// Images
const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const curved9 = `${imagePath}/curved-images/curved9.jpg`;

export {
  curved9
};


function Login() {
  const authContext = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [inputs, setInputs] = useState({
    email: "admin@jsonapi.com",
    password: "secret",
  });
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
    credentialsErros: false,
    textError: "",
  });

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const newUser = { email: inputs.email, password: inputs.password };

    const myData = {
      data: {
        type: "token",
        attributes: { ...newUser },
      },
    };

    try {
      const response = await AuthService.login(myData);
      authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setErrors({ ...errors, credentialsErros: true, textError: res.message });
      } else {
        setErrors({ ...errors, credentialsErros: true, textError: res.errors[0].detail });
      }
    }

    return () => {
      setInputs({
        email: "",
        password: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
        credentialsErros: false,
        textError: "",
      });
    };
  };



 


  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved9}
    >


        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Sign in
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <Socials />
          </SoftBox>




          <SoftBox p={3}>
            <SoftBox component="form" role="form" method="POST" onSubmit={submitHandler}>
              <SoftBox mb={2}>
                <SoftInput type="email"
                  label="Email"
                  fullWidth
                  name="email"
                  value={inputs.email}
                  onChange={changeHandler}
                  error={errors.emailError} />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput 
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
                 />
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Remember me
                </SoftTypography>
              </SoftBox>

              {errors.credentialsErros && (
                <SoftTypography variant="caption" color="error" fontWeight="light">
                  {errors.textError}
                </SoftTypography>
              )}


              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth type="submit">
                  sign in
                </SoftButton>
              </SoftBox>
              <Separator />
              <SoftBox mt={1} mb={3}>
                <SoftButton
                  component={Link}
                  to="/authentication/sign-up/basic"
                  variant="gradient"
                  color="dark"
                  fullWidth
                >
                  sign up
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>



        </Card>

      

    </BasicLayout>
  );
}

export default Login;
