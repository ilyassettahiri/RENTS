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


  const [description, setDescription] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [picture, setPicture] = useState(null);

  const [fileError, setFileError] = useState("");



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


  const [isSubmitting, setIsSubmitting] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const descNoTags = description.value.replace(/(<([^>]+)>)/gi, "").trim();
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const imgPattern = /<img\b[^>]*>/i;


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
    

    if (!picture) {

      setIsSubmitting(false);
      setFileError("Please select a valid image.");
      return;
    }

    const formData = new FormData();
    formData.append("data[attributes][name]", name.text);
    formData.append("data[attributes][description]", description.value);
    if (picture) {
      formData.append("data[attributes][picture]", picture);
    }

    


    try {
      await CrudService.createCollection(formData);
      navigate("/listing/collection", {
        state: { value: true, text: "The Collection was successfully created" },
      });
    } catch (err) {
      setIsSubmitting(false);

      if (err.hasOwnProperty("errors")) {
        setName({ ...name, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }

    setIsSubmitting(false);

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
                    <SoftButton variant="gradient" color="info" size="small" type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
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
