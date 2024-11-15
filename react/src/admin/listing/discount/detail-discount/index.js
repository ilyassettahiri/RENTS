
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
  
  

  const [data, setData] = useState(null);




 

  const [purchaseAmount, setPurchaseAmount] = useState({
    value: "",
    error: false,
    textError: "",
  });




  


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

 

  const [appliesTo, setAppliesTo] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [purchaseRequirement, setPurchaseRequirement] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [selectedCollections, setSelectedCollections] = useState({
    value: "",
    error: false,
    textError: "",
  });


  const [selectedListings, setSelectedListings] = useState({
    value: "",
    error: false,
    textError: "",
  });



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
          setCode({ text: discount.code, error: false, textError: "" });
          setDiscountValue({ text: discount.percentage, error: false, textError: "" });
          setAppliesTo({ value: discount.applies, error: false, textError: "" });
          setPurchaseRequirement({ value: discount.type, error: false, textError: "" });
          setPurchaseAmount({ value: discount.purchaseamount || "", error: false, textError: "" });
    
          // Pre-select the listings or collections based on the applies_to value
          if (discount.applies === "product") {
            setSelectedListings({
              value: discount.listings.map((listing) => ({
                value: listing.id,
                label: listing.title,
                icon: listing.picture
                  ? `${process.env.REACT_APP_IMAGE_BASE_URL}${listing.picture}`
                  : null,
              })),
              error: false,
              textError: "",
            });
          } else if (discount.applies === "collection") {
            setSelectedCollections({
              value: discount.collections.map((collection) => ({
                value: collection.id,
                label: collection.name,
                icon: collection.picture
                  ? `${process.env.REACT_APP_IMAGE_BASE_URL}${collection.picture}`
                  : null,
              })),
              error: false,
              textError: "",
            });
          }
        } catch (err) {
          console.error("Error fetching discount:", err);
        }
      })();
    }, [id]);
    





  const changeSelectedCollectionsHandler = (selectedOptions) => {
    if (selectedOptions.length === 0) {
      setSelectedCollections({
        value: [],
        error: true,
        textError: "A Collection must be selected",
      });
    } else {
      setSelectedCollections({
        value: selectedOptions,
        error: false,
        textError: "",
      });
    }
  };
  
  const changeSelectedListingsHandler = (selectedOptions) => {
    if (selectedOptions.length === 0) {
      setSelectedListings({
        value: [],
        error: true,
        textError: "A Listing must be selected",
      });
    } else {
      setSelectedListings({
        value: selectedOptions,
        error: false,
        textError: "",
      });
    }
  };
  

  

  const changeCodeHandler = (e) => {
    const newValue = e.target.value;
    setCode({
      ...code,
      text: newValue,
      error: newValue.trim().length < 1 || newValue.length > 255 || /https?:\/\/[^\s]+/.test(newValue),
      textError:
        newValue.trim().length < 1
          ? "The Code is required."
          : newValue.length > 255
          ? "The Code cannot exceed 255 characters"
          : /https?:\/\/[^\s]+/.test(newValue)
          ? "The Code cannot contain a URL"
          : "",
    });
  };


  const changeDiscountValueHandler = (e) => {
    const newValue = e.target.value;
    const isValidPercentage = /^[1-9][0-9]?$|^100$/.test(newValue); // Matches 1-99 only
  
    setDiscountValue({
      ...discountValue,
      text: newValue,
      error: newValue.trim().length < 1 || !isValidPercentage,
      textError:
        newValue.trim().length < 1
          ? "The Discount Value is required."
          : !isValidPercentage
          ? "The Discount Value must be a percentage between 1 and 99."
          : "",
    });
  };
  



  const changeAppliesToHandler = (selectedOption) => {
    setAppliesTo({
      value: selectedOption.value,
      error: selectedOption.value.trim().length === 0, // Set error if value is empty
      textError: selectedOption.value.trim().length === 0 ? "Applies to must be selected" : "",
    });
  };




  const changePurchaseRequirementHandler = (selectedOption) => {
    setPurchaseRequirement({
      value: selectedOption.value,
      error: selectedOption.value.trim().length === 0, // Set error if value is empty
      textError: selectedOption.value.trim().length === 0 ? "Minimum purchase requirements must be selected" : "",
    });
  };


  const changePurchaseAmountHandler = (e) => {
    const newValue = e.target.value;
  
    setPurchaseAmount({
      value: newValue,
      error: newValue.trim().length < 1 || isNaN(newValue) || newValue.length > 255,
      textError:
        newValue.trim().length < 1
          ? "The Purchase Amount is required."
          : isNaN(newValue)
          ? "The Purchase Amount must be a number."
          : newValue.length > 255
          ? "The Purchase Amount cannot exceed 255 characters."
          : "",
    });
  };
  





  const [isSubmitting, setIsSubmitting] = useState(false);



  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    

    if (appliesTo.value.trim().length < 1) {

      setIsSubmitting(false);


      setAppliesTo((prevCategory) => ({
          ...prevCategory,
          error: true,
          textError: "Applies to must be selected",
        }));
        return;
}

if (purchaseRequirement.value.trim().length < 1) {

      setIsSubmitting(false);

      setPurchaseRequirement((prevCategory) => ({
          ...prevCategory,
          error: true,
          textError: "Minimum purchase requirements must be selected",
        }));
        return;
}


// Validate code
if (code.text.trim().length < 1) {
  setIsSubmitting(false);
  setCode({
    ...code,
    error: true,
    textError: "The Code is required.",
  });
  return;
} else if (code.text.length > 255) {
  setIsSubmitting(false);
  setCode({
    ...code,
    error: true,
    textError: "The Code cannot exceed 255 characters.",
  });
  return;
} else if (/https?:\/\/[^\s]+/.test(code.text)) {
  setIsSubmitting(false);
  setCode({
    ...code,
    error: true,
    textError: "The Code cannot contain a URL.",
  });
  return;
} else {
  setCode({ ...code, error: false, textError: "" });
}

// Validate discountValue
const isValidPercentage = /^[1-9][0-9]?$|^100$/.test(discountValue.text);
if (discountValue.text.trim().length < 1) {
  setIsSubmitting(false);
  setDiscountValue({
    ...discountValue,
    error: true,
    textError: "The Discount Value is required.",
  });
  return;
} else if (!isValidPercentage) {
  setIsSubmitting(false);
  setDiscountValue({
    ...discountValue,
    error: true,
    textError: "The Discount Value must be a percentage between 1 and 99.",
  });
  return;
} else {
  setDiscountValue({ ...discountValue, error: false, textError: "" });
}



if (appliesTo.value === "collection") {
    if (selectedCollections.value.length < 1) {
      setIsSubmitting(false);
      setSelectedCollections((prevCategory) => ({
        ...prevCategory,
        error: true,
        textError: "A Collection must be selected",
      }));
      return;
    }

} else {

      if (selectedListings.value.length < 1) {
        setIsSubmitting(false);
        setSelectedListings((prevCategory) => ({
          ...prevCategory,
          error: true,
          textError: "A Listing must be selected",
        }));
        return;
      }

}


if (purchaseRequirement.value === "purchaseamount") {
          // Validate purchaseAmount
      if (purchaseAmount.value.trim().length < 1) {
        setIsSubmitting(false);
        setPurchaseAmount({
          ...purchaseAmount,
          error: true,
          textError: "The Purchase Amount is required.",
        });
        return;
      } else if (isNaN(purchaseAmount.value)) {
        setIsSubmitting(false);
        setPurchaseAmount({
          ...purchaseAmount,
          error: true,
          textError: "The Purchase Amount must be a number.",
        });
        return;
      } else if (purchaseAmount.value.length > 255) {
        setIsSubmitting(false);
        setPurchaseAmount({
          ...purchaseAmount,
          error: true,
          textError: "The Purchase Amount cannot exceed 255 characters.",
        });
        return;
      } else {
        setPurchaseAmount({ ...purchaseAmount, error: false, textError: "" });
      }

}



    const discountPayload = {
      data: {
        type: "discounts",
        attributes: {
          code: code.text,
          discountvalue: discountValue.text,
          applies_to: appliesTo.value,
          requirements: purchaseRequirement.value,
          collections_id: appliesTo.value === "collection" ? selectedCollections.value.map(option => option.value) : [],
          listings_id: appliesTo.value === "product" ? selectedListings.value.map(option => option.value) : [],
          purchaseamount: purchaseRequirement.value === "purchaseamount" ? purchaseAmount : null,
        },
      },
    };

    try {
      await CrudService.createDiscount(discountPayload);
      navigate("/listing/discount", {
        state: { value: true, text: "The Discount was successfully created" },
      });
    } catch (err) {

      setIsSubmitting(false);

      if (err.response && err.response.data && err.response.data.errors) {
        setCode({ ...code, error: true, textError: err.response.data.errors[0].detail });
      }
      console.error(err);
    }

    setIsSubmitting(false);

  };





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
                            
                            <SoftBox >
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                  <SoftBox>
                                    <FormField placeholder ="EXAMPLE10"
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
                                    <FormField placeholder ="10%"
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
                                        Applies to  <span style={{ color: "red",}}> * </span>

                                      </SoftTypography>
                                    </SoftBox>
                                    <SoftSelect
                                      options={[
                                        { value: "collection", label: "Specific Collection" },
                                        { value: "product", label: "Specific Product" },
                                      ]}
                                      

                                      onChange={changeAppliesToHandler}

                                      error={appliesTo.error}
                                    />


                                      {appliesTo.error && (
                                        <SoftTypography variant="caption" color="error" fontWeight="light">
                                          {appliesTo.textError}
                                        </SoftTypography>
                                      )}


                                  </SoftBox>
                                </Grid>
                              </Grid>
                            </SoftBox>

                            {appliesTo.value === "collection" && (
                              <SoftBox mt={4}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                                        Select Specific Collection 
                                        <span style={{ color: "red",}}> * </span>

                                      </SoftTypography>
                                    </SoftBox>
                                    <SoftSelect
                                      options={collectionOptions}
                                      isMulti

                                      onChange={changeSelectedCollectionsHandler}

                                      

                                      error={selectedCollections.error}

                                    />

                                      {selectedCollections.error && (
                                        <SoftTypography variant="caption" color="error" fontWeight="light">
                                          {selectedCollections.textError}
                                        </SoftTypography>
                                      )}

                                  </Grid>
                                </Grid>
                              </SoftBox>
                            )}

                            {appliesTo.value === "product" && (
                              <SoftBox mt={4}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                                        Select Specific Product
                                        <span style={{ color: "red",}}> * </span>

                                      </SoftTypography>
                                    </SoftBox>
                                    <SoftSelect
                                      options={listingOptions}
                                      isMulti

                                      onChange={changeSelectedListingsHandler}

                                      error={selectedListings.error}

                                    />

                                      {selectedListings.error && (
                                        <SoftTypography variant="caption" color="error" fontWeight="light">
                                          {selectedListings.textError}
                                        </SoftTypography>
                                      )}


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
                                <span style={{ color: "red",}}> * </span>

                              </SoftTypography>
                            </SoftBox>
                            <SoftSelect
                              options={[
                                { value: "nominimum", label: "No minimum requirements" },
                                { value: "purchaseamount", label: "Minimum purchase amount" },
                              ]}
                              onChange={changePurchaseRequirementHandler}

                              

                              error={purchaseRequirement.error}

                            />


                                      {purchaseRequirement.error && (
                                        <SoftTypography variant="caption" color="error" fontWeight="light">
                                          {purchaseRequirement.textError}
                                        </SoftTypography>
                                      )}
                          </SoftBox>

                          {purchaseRequirement.value === "purchaseamount" && (
                            <SoftBox p={3}>
                              <FormField
                                type="text"
                                placeholder="Minimum purchase amount"
                                label="Minimum purchase amount"
                                name="purchaseamount"
                                value={purchaseAmount.value}
                                onChange={changePurchaseAmountHandler}
                                error={purchaseAmount.error}
                              />

                                    {purchaseAmount.error && (
                                      <SoftTypography variant="caption" color="error" fontWeight="light">
                                        {purchaseAmount.textError}
                                      </SoftTypography>
                                    )}
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
                        <SoftButton variant="gradient" color="info" size="small" type="submit" onClick={submitHandler}
                        
                        disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save"}
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
