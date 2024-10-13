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




  // Fetch collection data (including listings) using React Query
  const { data: collectionData, isLoading: isCollectionLoading, error: collectionError } = useQuery({
    queryKey: ['collection', id],
    queryFn: () => CrudService.getCollection(id),
    
  });


    // Use useEffect to set collection and description when collectionData is fetched
    useEffect(() => {
      if (collectionData) {
        const collectionAttributes = collectionData.data.attributes;
        setCollection({
          id: collectionData.data.id,
          name: collectionAttributes.name,
          picture: collectionAttributes.picture,
        });
        setDescription(collectionAttributes.description);
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


  const [isSubmitting, setIsSubmitting] = useState(false);



  const submitHandler = async (e) => {
    e.preventDefault();


    setIsSubmitting(true);
  
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


    setIsSubmitting(false);
  };
  



  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await CrudService.updateCollectionStatus(payload, data.id);
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
                      <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                        Description

                        <span style={{ color: "red",}}> * </span>

                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} onChange={setDescription} />
                    {error.description && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
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
