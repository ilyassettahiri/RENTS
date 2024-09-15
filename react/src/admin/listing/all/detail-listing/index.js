import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "components/SoftButton";
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
  const [data, setData] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);


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

  


  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await CrudService.getDetailListing(id);
        const listingData = res.data.attributes;

        console.log('Listing Data:', listingData);

        setData(listingData);
        setCalendarEvents(
          listingData.reservations.map((reservation) => ({
            title: reservation.name,  // Use reservation name
            start: reservation.start,
            end: reservation.end,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);


  const category= data?.category;
  const url= data?.url;



  // TeamProfileCard dropdown menu state
  const [marketingMenu, setMarketingMenu] = useState(null);
  const [designMenu, setDesignMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openMarketingMenu = (event) => setMarketingMenu(event.currentTarget);
  const closeMarketingMenu = () => setMarketingMenu(null);
  const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
  const closeDesignMenu = () => setDesignMenu(null);

  // Dropdown menu for the digital marketing TeamProfileCard
  const renderMarketingMenu = (
    <Menu
      anchorEl={marketingMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(marketingMenu)}
      onClose={closeMarketingMenu}
      keepMounted
    >
      <MenuItem onClick={closeMarketingMenu}>Action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Something else here</MenuItem>
    </Menu>
  );

  // Dropdown menu for the design TeamProfileCard
  const renderDesignMenu = (
    <Menu
      anchorEl={designMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(designMenu)}
      onClose={closeDesignMenu}
      keepMounted
    >
      <MenuItem onClick={closeDesignMenu}>Action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Another action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Something else here</MenuItem>
    </Menu>
  );




  const eventCalendar = useMemo(
    () => (
      <EventCalendar
        initialView="dayGridMonth"
        initialDate={new Date()}
        events={calendarEvents}
        selectable
        editable
      />
    ),
    [calendarEvents]
  );

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
              { value: 'pending', label: 'Pending' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'cancelled', label: 'Cancelled' }
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
                <NextEvents />
              </SoftBox>
            </Grid>

            <Grid item xs={12}>
              <SoftBox mb={3}>
                <TeamProfileCard
                  title="design"
                  description="Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too."
                  industry="design team"
                  rating={5}
                  dropdown={{
                    action: openDesignMenu,
                    menu: renderDesignMenu,
                  }}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
}

export default DetailListing;
