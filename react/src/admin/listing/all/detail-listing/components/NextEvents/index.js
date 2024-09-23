import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import NotificationItem from "examples/Items/NotificationItem";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function NextEvents({ reservations }) {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  // Get the next reservation (assuming it's the first in the array)
  const nextReservation = reservations && reservations.length > 0 ? reservations[0] : null;

  // Format the date using date-fns
  const formattedDate = nextReservation ? format(new Date(nextReservation.start), 'dd MMMM yyyy') : null;
  
  const clickViewHandler = (id) => {
    navigate(`/reservation/detail-reservation/${id}`);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          {t('Next Reservation')}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        {nextReservation ? (
          <NotificationItem
            image="/logo/admin.jpg"
            title={[nextReservation.name,  ]}
            date={`${formattedDate}`}
            onClick={() => clickViewHandler(nextReservation.id)}  // Pass the reservation ID

          />
        ) : (
          <SoftTypography variant="caption" color="text">
            {t('No upcoming reservations available')}
          </SoftTypography>
        )}
      </SoftBox>
    </Card>
  );
}

NextEvents.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NextEvents;
