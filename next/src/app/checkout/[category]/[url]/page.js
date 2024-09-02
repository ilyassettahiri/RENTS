import CheckoutView from 'src/sections/checkout/checkout-view';

import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Rents.ma - Checkout',
};

const CheckoutPage = ({ params }) => <CheckoutView params={params} />;

export default CheckoutPage;

CheckoutPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
    // other params can be added here if needed
  }).isRequired,
};
