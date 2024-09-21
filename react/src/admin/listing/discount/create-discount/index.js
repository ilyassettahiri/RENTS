import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftSelect from "components/SoftSelect";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "admin/components/FormField";
import { useNavigate } from "react-router-dom";
import CrudService from "services/cruds-service";

const CreateDiscount = () => {
  const navigate = useNavigate();

  const [collectionsData, setCollectionsData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedListings, setSelectedListings] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState("");

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
  

  return (
    <DashboardLayout>
      <SoftBox mt={5} mb={10} component="form" method="POST" onSubmit={submitHandler}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
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
                          onChange={changeAppliesToHandler}
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
                  onChange={changePurchaseRequirementHandler}
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
                    onChange={changePurchaseAmountHandler}
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
    </DashboardLayout>
  );
};

export default CreateDiscount;
