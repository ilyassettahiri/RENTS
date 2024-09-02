import ThankYouView from 'src/sections/thank-you/thank-you-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Thank You - Order Completed',
};

const ThankYouPage = ({ params }) => <ThankYouView params={params} />;

ThankYouPage.propTypes = {
  params: PropTypes.shape({
    checkout_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThankYouPage;
