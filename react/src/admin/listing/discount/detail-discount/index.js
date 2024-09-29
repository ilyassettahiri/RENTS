
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftSelect from "components/SoftSelect";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/MDEditor";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import { CustomerDetailsToolbar } from "admin/components/CustomerDetailsToolbar/CustomerDetailsToolbar";

import Icon from "@mui/material/Icon";

import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FormField from "admin/components/FormField";
import { useNavigate, useParams } from "react-router-dom";

import CrudService from "services/cruds-service";

const DetailDiscount = () => {
  const { id } = useParams();



  const navigate = useNavigate();

  const [collectionsData, setCollectionsData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedListings, setSelectedListings] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState("");

  const [data, setData] = useState(null);




  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getDiscountData();
        setCollectionsData(response.data.collections);
        setListingsData(response.data.listings);
      } catch (error) {
        console.error("Error fetching discount data:", error);
      }
    })();
  }, []);

  const [code, setCode] = useState({
    text: "",
    error: false,
    textError: "",
  });



  const [discountValue, setDiscountValue] = useState({
    text: "",
    error: false,
    textError: "",
  });

  const [appliesTo, setAppliesTo] = useState("");
  const [purchaseRequirement, setPurchaseRequirement] = useState("");

  const changeCodeHandler = (e) => {
    setCode({ ...code, text: e.target.value });
  };

  const changeDiscountValueHandler = (e) => {
    setDiscountValue({ ...discountValue, text: e.target.value });
  };

  const changeAppliesToHandler = (selectedOption) => {
    setAppliesTo(selectedOption.value);
  };

  const changePurchaseRequirementHandler = (selectedOption) => {
    setPurchaseRequirement(selectedOption.value);
  };

  const changePurchaseAmountHandler = (e) => {
    setPurchaseAmount(e.target.value);
  };






  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.text.trim().length < 1) {
      setCode({ ...code, error: true, textError: "The Discount name is required" });
      return;
    }

    const discountPayload = {
      data: {
        type: "discounts",
        attributes: {
          code: code.text,
          discountvalue: discountValue.text,
          applies_to: appliesTo,
          requirements: purchaseRequirement,
          collections_id: appliesTo === "collection" ? selectedCollections.map(option => option.value) : [],
          listings_id: appliesTo === "product" ? selectedListings.map(option => option.value) : [],
          purchaseamount: purchaseRequirement === "purchaseamount" ? purchaseAmount : null,
        },
      },
    };

    try {
      await CrudService.createDiscount(discountPayload);
      navigate("/listing/discount", {
        state: { value: true, text: "The Discount was successfully created" },
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setCode({ ...code, error: true, textError: err.response.data.errors[0].detail });
      }
      console.error(err);
    }
  };

  const collectionOptions = collectionsData.map((collection) => ({
    value: collection.id,
    label: collection.attributes.name,
    icon: collection.attributes.picture ? `${process.env.REACT_APP_IMAGE_BASE_URL}${collection.attributes.picture}` : null,
  }));
  
  const listingOptions = listingsData.map((listing) => ({
    value: listing.id,
    label: listing.attributes.title,
    icon: listing.attributes.picture ? `${process.env.REACT_APP_IMAGE_BASE_URL}${listing.attributes.picture}` : null,
  }));
  



    // Fetch discount details and pre-select values
    useEffect(() => {
      if (!id) return;
      (async () => {
        try {
          const res = await CrudService.getDiscount(id);

          
          const discount = res.data.attributes;

          setSelectedStatus(discount.status);
          setInitialStatus(discount.status);
  
          setData(discount);
          // Set fetched values to the state
          setCode({ text: discount.code, error: false });
          setDiscountValue({ text: discount.percentage, error: false });
          setAppliesTo(discount.applies);
          setPurchaseRequirement(discount.type);
          setPurchaseAmount(discount.purchaseamount || "");
  
          // Pre-select the listings or collections based on the applies_to value
          if (discount.applies === "product") {
            setSelectedListings(discount.listings.map(listing => ({
              value: listing.id,
              label: listing.title,
              icon: listing.picture ? `${process.env.REACT_APP_IMAGE_BASE_URL}${listing.picture}` : null,
            })));
          } else if (discount.applies === "collection") {
            setSelectedCollections(discount.collections.map(collection => ({
              value: collection.id,
              label: collection.name,
              icon: collection.picture ? `${process.env.REACT_APP_IMAGE_BASE_URL}${collection.picture}` : null,
            })));
          }
        } catch (err) {
          console.error('Error fetching discount:', err);
        }
      })();
    }, [id]);

 

  const clickDeleteHandler = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this listing?");
  
    if (!isConfirmed) {
      // If the user cancels, stop the function execution
      return;
    }
  
    try {
      // Send delete request
      await CrudService.deleteDiscount(id);
      
      // Navigate after successful deletion
      navigate("/listing/create-listing");
    } catch (error) {
      console.error('Failed to delete listing:', error);
      // You can show an error message here if needed
    }
  };





  const [selectedStatus, setSelectedStatus] = useState(data?.attributes?.status || "");
  const [initialStatus, setInitialStatus] = useState(data?.attributes?.status || "");
  
  // Update the selected status and track changes
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus.value);
  };
  
  // Handle the status update when the save button is clicked
  const handleSave = async () => {
    try {
      const payload = { status: selectedStatus };
      const response = await CrudService.updateDiscountStatus(payload, id);
      if (response.data) {
        setData((prevData) => ({
          ...prevData,
          attributes: {
            ...prevData.attributes,
            status: selectedStatus,
          },
        }));
        // Reset the initial status to the newly saved status
        setInitialStatus(selectedStatus);
      }
    } catch (error) {
      console.error(`Error updating reservation status to ${selectedStatus}:`, error);
    }
  };







  return (
    <DashboardLayout>
      
      <SoftBox my={3}>



          {data ? (
          <CustomerDetailsToolbar
            backLink="/reservation/list"
            customerNumber={id}
            createdAt={data.created_at || ''}
            status={data.status || ''}
            title="Delete Discount"
            idname="Discount"
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



            <Grid item xs={12} lg={8}>
            


                <SoftBox  mb={10} component="form" method="POST" onSubmit={submitHandler}>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} lg={12}>
                      <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                        <SoftBox p={3}>
                          <SoftTypography variant="h5">Create Discount</SoftTypography>
                          <SoftBox mt={4}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6}>
                                <SoftBox>
                                  <FormField placeholder ="discount code"
                                    type="text"
                                    label="Code"
                                    name="code"
                                    value={code.text}
                                    onChange={changeCodeHandler}
                                    error={code.error}
                                  />
                                  {code.error && (
                                    <SoftTypography variant="caption" color="error" fontWeight="light">
                                      {code.textError}
                                    </SoftTypography>
                                  )}
                                </SoftBox>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <SoftBox>
                                  <FormField placeholder ="percentage"
                                    type="text"
                                    label="Discount Value"
                                    name="discountvalue"
                                    value={discountValue.text}
                                    onChange={changeDiscountValueHandler}
                                    error={discountValue.error}
                                  />
                                  {discountValue.error && (
                                    <SoftTypography variant="caption" color="error" fontWeight="light">
                                      {discountValue.textError}
                                    </SoftTypography>
                                  )}
                                </SoftBox>
                              </Grid>
                            </Grid>
                          </SoftBox>

                          <SoftBox mt={4}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <SoftBox mb={3}>
                                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                    <SoftTypography
                                      component="label"
                                      variant="caption"
                                      fontWeight="bold"
                                      textTransform="capitalize"
                                    >
                                      Applies to
                                    </SoftTypography>
                                  </SoftBox>
                                  <SoftSelect
                                    options={[
                                      { value: "collection", label: "Specific Collection" },
                                      { value: "product", label: "Specific Product" },
                                    ]}
                                    value={{ value: appliesTo, label: appliesTo === "collection" ? "Specific Collection" : "Specific Product" }}
                                    onChange={(selectedOption) => setAppliesTo(selectedOption.value)}
                                  />
                                </SoftBox>
                              </Grid>
                            </Grid>
                          </SoftBox>

                          {appliesTo === "collection" && (
                            <SoftBox mt={4}>
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                      Select Specific Collection
                                    </SoftTypography>
                                  </SoftBox>
                                  <SoftSelect
                                    options={collectionOptions}
                                    isMulti
                                    value={selectedCollections}

                                    onChange={(selectedOptions) => setSelectedCollections(selectedOptions)}
                                  />
                                </Grid>
                              </Grid>
                            </SoftBox>
                          )}

                          {appliesTo === "product" && (
                            <SoftBox mt={4}>
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                      Select Specific Product
                                    </SoftTypography>
                                  </SoftBox>
                                  <SoftSelect
                                    options={listingOptions}
                                    isMulti
                                    value={selectedListings}

                                    onChange={(selectedOptions) => setSelectedListings(selectedOptions)}
                                  />
                                </Grid>
                              </Grid>
                            </SoftBox>
                          )}
                        </SoftBox>
                      </Card>

                      <Card sx={{ overflow: "visible", mt: 2, mb: 5 }}>
                        <SoftBox p={3}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Minimum purchase requirements
                            </SoftTypography>
                          </SoftBox>
                          <SoftSelect
                            options={[
                              { value: "nominimum", label: "No minimum requirements" },
                              { value: "purchaseamount", label: "Minimum purchase amount" },
                            ]}
                            value={{ value: purchaseRequirement, label: purchaseRequirement === "nominimum" ? "No minimum requirements" : "Minimum purchase amount" }}
                            onChange={(selectedOption) => setPurchaseRequirement(selectedOption.value)}
                          />
                        </SoftBox>

                        {purchaseRequirement === "purchaseamount" && (
                          <SoftBox p={3}>
                            <FormField
                              type="text"
                              placeholder="Minimum purchase amount"
                              label="Minimum purchase amount"
                              name="purchaseamount"
                              value={purchaseAmount}
                              onChange={(e) => setPurchaseAmount(e.target.value)}
                            />
                          </SoftBox>
                        )}
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
                              navigate("/listing/discount", {
                                state: { value: false, text: "" },
                              })
                            }
                          >
                            Back
                          </SoftButton>
                        </SoftBox>
                        <SoftButton variant="gradient" color="info" size="small" type="submit" onClick={submitHandler}>
                          Save
                        </SoftButton>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>


                
              
            </Grid>







            <Grid item xs={12} lg={4}>


              <Grid item xs={12}>
                <SoftBox mb={3}>



                    <Card sx={{ overflow: "visible", mt: 2 }}>
                      <SoftBox mb={3} sx={{ p: 2 }} >
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Status
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          
                          value={{ value: selectedStatus, label: selectedStatus || "Select Status" }}

                          options={[
                          
                            { value: "active", label: "Active" },
                            { value: "draft", label: "Draft" },
                            { value: "pending", label: "Pending" },

                          ]}
                          onChange={handleStatusChange}
                        />
                      </SoftBox>

                        {/* Only show the save button if the status has changed */}
                        {selectedStatus !== initialStatus && (
                          <SoftBox mb={2} display="flex" justifyContent="center">
                            <SoftButton onClick={handleSave} variant="gradient" color="info" size="small">
                              save
                            </SoftButton>
                          </SoftBox>
                        )}


                    </Card>





                </SoftBox>
              </Grid>




            </Grid>




        </Grid>


      </SoftBox>
      
    </DashboardLayout>
  );
};

export default DetailDiscount;
