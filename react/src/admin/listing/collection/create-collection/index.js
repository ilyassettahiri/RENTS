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

const sofa =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

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

  const changeNameHandler = (e) => {
    setName({ ...name, text: e.target.value });
  };

  const changePictureHandler = (e) => {
    setPicture(e.target.files[0]);
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
          <Grid item xs={12} lg={8}>
            <Card>
              <SoftBox component="form" method="POST" onSubmit={submitHandler} encType="multipart/form-data">
                <SoftBox display="flex" flexDirection="column" px={3} my={2}>
                  <SoftTypography variant="h5" fontWeight="bold">
                    Create collection
                  </SoftTypography>

                  <SoftBox p={1}>
                    <FormField
                      type="text"
                      label="Name"
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
                      <SoftTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Description&nbsp;&nbsp;
                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} onChange={setDescription} />
                    {descError && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        The Collection description is required
                      </SoftTypography>
                    )}
                  </SoftBox>
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
                    <SoftButton variant="gradient" color="dark" size="small" type="submit">
                      Save
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid item xs={12}>
              <SoftBox mb={3}>
                <Card sx={{ overflow: "visible" }}>
                  <SoftBox p={1}>
                    <SoftTypography variant="h6" fontWeight="bold">
                      Image
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
                          src={sofa}
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
