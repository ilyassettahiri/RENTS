import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/MDEditor";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FormField from "admin/components/FormField";

import CrudService from "services/cruds-service";


const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const curved9 = `${imagePath}/curved-images/curved9.jpg`;

export {
  curved9
};



const CreateCollection = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState(false);

  const [picture, setPicture] = useState(null);

  const [fileError, setFileError] = useState("");



  const changeNameHandler = (e) => {
    const newText = e.target.value;
  
    setName((prevName) => ({
      ...prevName,
      text: newText,
      error: newText.trim().length === 0 ? prevName.error : false,
      textError: newText.trim().length === 0 ? prevName.textError : "",
    }));
  };

  const acceptedTypes = ["image/jpeg", "image/png", "image/tiff", "image/jpg", "image/webp", "image/gif"];
  const maxFileSize = 6 * 1024 * 1024; // 6 MB


  const changePictureHandler = (e) => {
    const file = e.target.files[0];
  
    // Check if a file is selected
    if (!file) {
      setFileError("Please select an image.");
      setPicture(null); // Ensure no picture is set if no file is selected
      return;
    }
  
    // Check the file type
    if (!acceptedTypes.includes(file.type)) {
      setFileError("Only image files (JPEG, PNG, GIF, WEBP, TIFF) are allowed.");
      setPicture(null); // Do not set the file if it is not a valid image
      return;
    }
  
    // Check the file size
    if (file.size > maxFileSize) {
      setFileError("Image must be less than 6MB.");
      setPicture(null); // Do not set the file if it exceeds the size limit
      return;
    }
  
    // Clear any previous errors and set the picture
    setFileError("");
    setPicture(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.text.trim().length < 1) {
      setName({ ...name, error: true, textError: "The Collection name is required" });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags.trim().length < 1) {
      setDescError(true);
      return;
    }

    if (!picture) {
      setFileError("Please select a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("data[attributes][name]", name.text);
    formData.append("data[attributes][description]", description);
    if (picture) {
      formData.append("data[attributes][picture]", picture);
    }

    console.log("Form Data:", formData);


    try {
      await CrudService.createCollection(formData);
      navigate("/listing/collection", {
        state: { value: true, text: "The Collection was successfully created" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setName({ ...name, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <SoftBox mt={5} mb={9}>



        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} component="form" method="POST" onSubmit={submitHandler} encType="multipart/form-data">
            <Card>
              <SoftBox >
                <SoftBox display="flex" flexDirection="column" p={3}>
                  
                  <SoftBox p={1}>
                    <FormField
                      type="text"
                      label="Name"
                      placeholder="Newest "

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
                  <SoftBox mt={2}>
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                        Description

                        <span style={{ color: "red",}}> * </span>

                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} 
                    
                    
                    onChange={(value) => {
                      setDescription(value);

                      // Remove error when description is not empty
                      if (value.replace(/(<([^>]+)>)/gi, "").trim().length > 0) {
                        setDescError(false);
                      }
                    }}
                    
                    />
                    {descError && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        The Collection description is required
                      </SoftTypography>
                    )}
                  </SoftBox>

                </SoftBox>
              </SoftBox>
            </Card>

                  <SoftBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <SoftBox mx={2}>
                      <SoftButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/listing/collection", {
                            state: { value: false, text: "" },
                          })
                        }
                      >
                        Back
                      </SoftButton>
                    </SoftBox>
                    <SoftButton variant="gradient" color="info" size="small" type="submit">
                      Save
                    </SoftButton>
                  </SoftBox>

          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  <SoftBox p={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Image
                    <span style={{ color: "red" }}> * </span>
                       (JPEG, PNG, GIF, WEBP, TIFF. Max: 6MB)
                      
                  </SoftTypography>

                    <SoftBox
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px dashed #e7e7e7",
                        borderRadius: "8px",
                        padding: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={changePictureHandler}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      {picture ? (
                        <SoftBox
                          component="img"
                          src={URL.createObjectURL(picture)}
                          alt="Product Image"
                          borderRadius="lg"
                          shadow="lg"
                          width="100%"
                        />
                      ) : (
                        <SoftBox
                          component="img"
                          src={curved9}
                          alt="Product Image"
                          borderRadius="lg"
                          shadow="lg"
                          width="100%"
                        />
                      )}
                      <IconButton
                        color="primary"
                        component="span"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      {fileError && (
                        <SoftTypography variant="caption" color="error" fontWeight="light">
                          {fileError}
                        </SoftTypography>
                      )}
                      
                    </SoftBox>
                  </SoftBox>
                </Card>
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
};

export default CreateCollection;
