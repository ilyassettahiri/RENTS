import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/MDEditor";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { CustomerDetailsToolbar } from "admin/components/CustomerDetailsToolbar/CustomerDetailsToolbar";

import Icon from "@mui/material/Icon";

import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FormField from "admin/components/FormField";
import { useNavigate, useParams } from "react-router-dom";

import CrudService from "services/cruds-service";

const DetailCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [data, setData] = useState(null);


  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState({
    id: "",
    name: "",
    picture: "",
  });

  const [picture, setPicture] = useState(null);

  const [error, setError] = useState({
    name: false,
    description: false,
    error: false,
    textError: "",
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await CrudService.getCollection(id);
        setCollection({
          id: res.data.id,
          name: res.data.attributes.name,
          
          picture: res.data.attributes.picture,
        });
        setData(res.data.attributes);

        setDescription(res.data.attributes.description);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const changePictureHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      console.log("Selected file:", file);
      setPicture(file);
    } else {
      console.error("Selected file is not an image.");
    }
  };

  const changeNameHandler = (e) => {
    setCollection({ ...collection, name: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (collection.name.trim().length < 1) {
      setError({ ...error, name: true, textError: "The Collection name is required" });
      return;
    }
  
    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags.trim().length < 1) {
      setError({ ...error, description: true, textError: "The Collection description is required" });
      return;
    }
  
    try {
      let pictureUrl = collection.picture;
  
      console.log("Initial picture URL:", pictureUrl);
  
      // Upload the picture separately if present
      if (picture) {
        const formData = new FormData();
        formData.append('attachment', picture);
  
        const pictureUploadResponse = await CrudService.imageUploadCollection(formData, collection.id);
        console.log("Picture upload response:", pictureUploadResponse); // Log the full response

        pictureUrl = pictureUploadResponse.relativePath;
      }
  
      const updatedCollection = {
        id: collection.id,
        name: collection.name,
        description,
        picture: pictureUrl,
      };
  
      await CrudService.updateCollection(updatedCollection, collection.id);
  
      navigate("/listing/collection", {
        state: { value: true, text: "The Collection was successfully updated" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setError({ ...error, name: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }
  };
  


  
  const clickDeleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
  
    if (!isConfirmed) {
      // If the user cancels, stop the function execution
      return;
    }
  
    try {
      // Send delete request
      await CrudService.deleteCollection(id);
      
      // Navigate after successful deletion
      navigate("/listing/create-listing");
    } catch (error) {
      console.error('Failed to delete listing:', error);
      // You can show an error message here if needed
    }
  };
  


  return (
    <DashboardLayout>
      <SoftBox my={3}>



        {data && (<CustomerDetailsToolbar
            backLink="/reservation/list"
            customerNumber={id}
            createdAt={data?.created_at}
            status={data?.status}
            title="Delete Collection"
            idname="Collection"
            clickAddHandler={clickDeleteHandler}
           

            statusOptions={[
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
          />
        )}


        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <SoftBox component="form" method="POST" onSubmit={submitHandler}>
                <SoftBox display="flex" flexDirection="column" px={3} my={2}>
                  <SoftBox p={1}>
                    <FormField
                      type="text"
                      label="Name"
                      name="name"
                      value={collection.name}
                      onChange={changeNameHandler}
                      error={error.name}
                    />
                    {error.name && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
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
                    {error.description && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
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
                        collection.picture && (
                          <SoftBox
                            component="img"
                            src={`${process.env.REACT_APP_IMAGE_COLLECTION}${collection.picture}`}
                            alt="Product Image"
                            borderRadius="lg"
                            shadow="lg"
                            width="100%"
                          />
                        )
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

export default DetailCollection;
