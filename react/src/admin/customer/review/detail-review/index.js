/* eslint-disable react/prop-types */


import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";
import Post from "admin/customer/review/detail-review/components/Post";


import SoftButton from "components/SoftButton";

import Icon from "@mui/material/Icon";

import Divider from "@mui/material/Divider";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { CustomerDetailsToolbar } from "admin/components/CustomerDetailsToolbar/CustomerDetailsToolbar";

import Card from "@mui/material/Card";








function DetailReview() {
  const { t } = useTranslation();


  const { id } = useParams();
  const ability = useAbility(AbilityContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getReview(id);
        setData(response.data);

       
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    })();
  }, [id]);


  const clickAddHandler = () => {
    navigate("/listing/create-listing");
  };



  const handleStatusChange = async (newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await CrudService.updateReviewStatus(payload, data.id);
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


        {data && (<CustomerDetailsToolbar
            backLink="/reservation/list"
            customerNumber={id}
            createdAt={data?.attributes.created_at}
            status={data?.attributes.status}
            title="Request Review"
            idname="Review"
            clickAddHandler={clickAddHandler}
           

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
                    
                  <Post />

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


            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="design"
                  description="Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too."
                  industry="design team"
                  rating={5}
                  
                  
                />
              </SoftBox>
            </Grid>
            
          </Grid>


        </Grid>
      </SoftBox>
      
    </DashboardLayout>
  );
}

export default DetailReview;
