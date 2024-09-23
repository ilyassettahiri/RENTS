
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

  const [data, setData] = useState(null);


  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState({
    id: "",
    name: "",
  });
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
        const res = await CrudService.getDiscount(id);
        setDiscount({
          id: res.data.id,
          name: res.data.attributes.name,
        });

        setData(res.data.attributes);


        setDescription(res.data.attributes.description);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const changeNameHandler = (e) => {
    setDiscount({ ...discount, name: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (discount.name.trim().length < 1) {
      setError({ ...error, name: true, textError: "The discount name is required" });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags < 1) {
      setError({
        ...error,
        description: true,
        textError: "The discount description is required",
      });
      return;
    }

    const discountUpdated = {
      data: {
        type: "discounts",
        id: discount.id.toString(),
        attributes: {
          name: discount.name,
          description,
        },
      },
    };

    try {
      await CrudService.updateDiscount(discountUpdated, discountUpdated.data.id);
      navigate("/listing/discount", {
        state: { value: true, text: "The discount was sucesfully updated" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setError({ ...discount, error: true, textError: err.errors[0].detail });
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
      await CrudService.deleteDiscount(id);
      
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
            title="Delete Discount"
            idname="Discount"
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
                      value={discount.name}
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
                          navigate("/listing/discount", {
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
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>


          <Grid item xs={12} lg={4}>


              <Grid item xs={12}>
                <SoftBox mb={3}>
                  <TeamProfileCard
                    title="digital marketing"
                    description="A group of people who collectively are responsible for all of the work necessary to produce working, validated assets."
                    industry="marketing team"
                    rating={4.5}
                    
                    
                  />
                </SoftBox>
              </Grid>


              
            
          </Grid>



        </Grid>


      </SoftBox>
      
    </DashboardLayout>
  );
};

export default DetailDiscount;
