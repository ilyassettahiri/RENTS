/* eslint-disable react/prop-types */


import PropTypes from "prop-types";

// @fullcalendar components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Custom styles for Calendar
import CalendarRoot from "examples/Calendar/CalendarRoot";

function EventCalendar({ header, ...rest }) {
  const validClassNames = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ];

  const events = rest.events
    ? rest.events.map((el) => ({
        ...el,
        className: validClassNames.find((item) => item === el.className)
          ? `event-${el.className}`
          : "event-info",
      }))
    : [];

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} lineHeight={1}>
        {header.title ? (
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {header.title}
          </SoftTypography>
        ) : null}
        {header.date ? (
          <SoftTypography component="p" variant="button" color="text" fontWeight="medium">
            {header.date}
          </SoftTypography>
        ) : null}
      </SoftBox>
      <CalendarRoot p={2}>
        <FullCalendar
          {...rest}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          height="100%"
        />
      </CalendarRoot>
    </Card>
  );
}

// settings default values for the props of Calendar
EventCalendar.defaultProps = {
  header: {
    title: "",
    date: "",
  },
};

// Typechecking props for the Calendar
EventCalendar.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
};

export default EventCalendar;
