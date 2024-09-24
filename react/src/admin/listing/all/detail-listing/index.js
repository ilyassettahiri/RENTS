import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "components/SoftButton";

import { useQuery } from '@tanstack/react-query';


import EventCalendar from "examples/Calendar";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CrudService from "services/cruds-service";
import NextEvents from "admin/listing/all/detail-listing/components/NextEvents";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";

import { ListingDetailsToolbar } from "admin/components/ListingDetailsToolbar/ListingDetailsToolbar";


import ProductCell from "admin/components/ProductCell";


function DetailListing() {
  const { t } = useTranslation();

  const { id } = useParams();




  // Use React Query to fetch listing details
  const { data: listingData, isLoading, error } = useQuery({
    queryKey: ['listingDetail', id],
    queryFn: () => CrudService.getDetailListing(id),
    enabled: !!id,
    onError: (error) => {
      console.error('Failed to fetch listing details:', error);
    },
  });

  const data = listingData?.data.attributes;

  // Memoize calendar events
  const calendarEvents = useMemo(() => {
    if (!data) return [];

    return data.reservations.map((reservation) => ({
      title: reservation.name,  // Use reservation name
      start: reservation.start,
      end: reservation.end,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,  // Random color for event
    }));
  }, [data]);

  const eventCalendar = useMemo(() => (
    <EventCalendar
      initialView="dayGridMonth"
      initialDate={new Date()}
      events={calendarEvents}
      selectable
      editable
    />
  ), [calendarEvents]);

  const clickAddHandler = () => {
    navigate("/listing/create-listing");
  };

  const clickEditHandler = (id) => {
    navigate(`/listing/edit-listing/${id}`);
  };

  const clickOpenHandler = (category, url) => {
    const baseUrl = category === 'services' 
      ? `https://rents.ma/service-page/${url}`  // URL for services category
      : `https://rents.ma/listing-page/${category}/${url}`;  // Default URL for other categories
    
    window.open(baseUrl, '_blank');  // Open the URL in a new tab
  };

  if (isLoading) {
    return <div>{t("Loading...")}</div>;
  }

  if (error) {
    return <div>{t("Error loading data")}</div>;
  }

  const category = data?.category;
  const url = data?.url;



  return (
    <DashboardLayout>
      <SoftBox my={3}>

          


        {data && (<ListingDetailsToolbar
            backLink="/reservation/list"
            listingNumber={data?.id}
            createdAt={data?.created_at}
            status={data?.status}
            title="createListing"
            clickAddHandler={clickAddHandler}
            clickEditHandler={() => clickEditHandler(data?.id)}
            clickOpenHandler={() => clickOpenHandler(category, url)}

            statusOptions={[
              { value: 'pending', label: t('Pending') },
              { value: 'active', label: t('Active') },
              { value: 'completed', label: t('Completed') },
              { value: 'cancelled', label: t('Cancelled') }
            ]}
          />
        )}


        

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>


            
              <SoftBox  >
                {data && (
                  <>
                    
                    
                    {eventCalendar}
                  </>
                )}
              </SoftBox>
            
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid item xs={12}>
              <SoftBox mb={3}>
                {data && <NextEvents reservations={data.reservations} />}
              </SoftBox>
            </Grid>

          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default DetailListing;
