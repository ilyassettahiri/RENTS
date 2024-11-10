import DashboardReservationView from 'src/sections/dashboard/dashboard-reservation-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Reservation Detail',
};

const DashboardReservationPage = ({ params }) => <DashboardReservationView params={params} />;

DashboardReservationPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.number.isRequired,

  }).isRequired,
};

export default DashboardReservationPage;
