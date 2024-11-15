/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/MDEditor";
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

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


import ProductCell from "admin/components/ProductCell";


import DataTable from "examples/Tables/DataTable";
import TableSkeleton from "examples/Tables/DataTable/TableSkeleton";



import HTMLReactParser from "html-react-parser";

import IdCell from "admin/components/IdCell";
import DefaultCell from "admin/components/DefaultCell";
import StatusCell from "admin/components/StatusCell";
import CustomerCell from "admin/components/CustomerCell";





const DetailCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [data, setData] = useState(null);


  
  const [description, setDescription] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [collectionID, setCollectionID] = useState();

  const [name, setName] = useState({
    text: "",
    error: false,
    textError: "",
  });


  const [oldpicture, setOldpicture] = useState(null);

  const [picture, setPicture] = useState(null);

  const [fileError, setFileError] = useState("");





  // Fetch collection data (including listings) using React Query
  const { data: collectionData, isLoading: isCollectionLoading, error: collectionError } = useQuery({
    queryKey: ['collection', id],
    queryFn: () => CrudService.getCollection(id),
    
  });


    // Use useEffect to set collection and description when collectionData is fetched
    useEffect(() => {
      if (collectionData) {
        const collectionAttributes = collectionData.data.attributes;
        
        setCollectionID(collectionData.data.id);

        setOldpicture(collectionAttributes.picture);

        setName({
          text: collectionAttributes.name,
          error: false,
          textError: ""
        });
        
        setDescription({
          value: collectionAttributes.description,
          error: false,
          textError: ""
        });
      }
    }, [collectionData]);

  // Memoize the table data for listings
  const tableData = useMemo(() => {
    if (!collectionData) return [];

    return collectionData.data.attributes.listings.map((listing) => ({
      product: {
        image: `${process.env.REACT_APP_IMAGE_LISTING_SMALL}${listing.picture}`,
        name: listing.title,
        checked: false,
        id: listing.id,
      },
      price: listing.price,
      status: listing.status,
      created_at: format(new Date(listing.created_at), 'd MMM, h:mm a'),
      id: listing.id,
      category: listing.category,
      url: listing.url,
    }));
  }, [collectionData]);

  const dataTableData = {
    columns: [
      {
        Header: "product",
        accessor: "product",
        width: "40%",
        Cell: ({ cell: { value } }) => (
          <ProductCell
            image={value.image}
            name={value.name}
            checked={value.checked}
            id={value.id}
            linkPath={`/listing/detail-listing/${value.id}`}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          const value = row.original.status;
          return (
            <div style={{ cursor: "pointer" }}>
              <StatusCell icon={value === "active" ? "done" : "close"} color={value === "active" ? "success" : "error"} status={value} />
            </div>
          );
        },
      },
      { Header: "price", accessor: "price" },
      { Header: "created at", accessor: "created_at" },
    ],
    rows: tableData,
  };



  const clickEditHandler = (id) => {
    navigate(`/listing/edit-listing/${id}`);
  };

  const clickDeleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!isConfirmed) return;

    try {
      await CrudService.deleteCollection(id);
      navigate("/listing/collection");
    } catch (error) {
      console.error('Failed to delete listing:', error);
    }
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
  


  const [isSubmitting, setIsSubmitting] = useState(false);



  const submitHandler = async (e) => {
    e.preventDefault();


    setIsSubmitting(true);
  
    const descNoTags = description.value.replace(/(<([^>]+)>)/gi, "").trim();
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const imgPattern = /<img\b[^>]*>/i;


    if (name.text.trim().length < 1) {
      setIsSubmitting(false);
      setName({ ...name, error: true, textError: "The Store Name is Required" });
      return;
    } else if (name.text.length > 255) {
      setIsSubmitting(false);
      setName({
        ...name,
        error: true,
        textError: "The Name cannot exceed 255 characters",
      });
      return;
    } else if (urlPattern.test(name.text)) { // Checks if name contains a URL
      setIsSubmitting(false);
      setName({
        ...name,
        error: true,
        textError: "The Store Name cannot contain a URL",
      });
      return;
    } else {
      setName({ ...name, error: false, textError: "" });
    }

  



  
    // Check if description is empty, contains URLs, or contains image tags
    if (descNoTags.length < 1) {

      setIsSubmitting(false);
      setDescription((prevDescription) => ({
        ...prevDescription,
        error: true,
        textError: "The Description must contain text content.",
      }));
      return;
    }
    
    if (urlPattern.test(description.value)) {

      setIsSubmitting(false);
      setDescription((prevDescription) => ({
        ...prevDescription,
        error: true,
        textError: "The Description cannot contain URLs.",
      }));
      return;
    }
  
    if (imgPattern.test(description.value)) {

      setIsSubmitting(false);
      setDescription((prevDescription) => ({
        ...prevDescription,
        error: true,
        textError: "The Description cannot contain images.",
      }));
      return;
    }
  

    if (!picture) {

      setIsSubmitting(false);
      setFileError("Please select a valid image.");
      return;
    }

  
  
    try {
      let pictureUrl = oldpicture;
  
  
      
     
        

        const formData = new FormData();
        formData.append('attachment', picture);
  
        const pictureUploadResponse = await CrudService.imageUploadCollection(formData, collectionID);

        pictureUrl = pictureUploadResponse.relativePath;
     
  
      const updatedCollection = {
        id: collectionID,
        name: name.text,
        description: description.value,
        picture: pictureUrl,
      };
  
      await CrudService.updateCollection(updatedCollection, collectionID);
  
      navigate("/listing/collection", {
        state: { value: true, text: "The Collection was successfully updated" },
      });
    } catch (err) {
      setIsSubmitting(false);

      if (err.hasOwnProperty("errors")) {
        setError({ ...name, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }


    setIsSubmitting(false);
  };
  



  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await CrudService.updateCollectionStatus(payload, collectionID);
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          attributes: {
            ...prevData.attributes,
            status: newStatus,
          },
        }));
        
      }
    } catch (error) {
      console.error(`Error updating reservation status to ${newStatus}:`, error);
    }
  };



  return (
    <DashboardLayout>
      <SoftBox my={3}>



        {collectionData ? (
          <CustomerDetailsToolbar
            backLink="/reservation/list"
            customerNumber={id}
            createdAt={collectionData?.data?.attributes?.created_at || ''}
            status={collectionData?.data?.attributes?.status || ''}
            title="Delete Collection"
            idname="Collection"
            clickAddHandler={clickDeleteHandler}
            statusOptions={[
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
          />
        ) : (
          <div>Loading...</div> // You can replace this with a loader component if needed
        )}
        


        <Grid container spacing={3}>


          <Grid item xs={12} lg={8} component="form" method="POST" onSubmit={submitHandler}>
            <Card>
              <SoftBox >
                <SoftBox display="flex" flexDirection="column" p={3} >
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


            <Card sx={{ mt:5 }}>

              {isCollectionLoading ? (
                <TableSkeleton rows={5} columns={5} />  
              ) : (
                  <DataTable
                    table={dataTableData}
                    entriesPerPage={{
                      defaultValue: 30,
                      entries: [30, 50, 100, 200],
                    }}
                    canSearch
                  />
              )}


            </Card>




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
                        picture && (
                          <SoftBox
                            component="img"
                            src={`${process.env.REACT_APP_IMAGE_COLLECTION}${picture}`}
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
