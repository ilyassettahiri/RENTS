import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-commerce: Home',
};

const EcommerceLandingPage = ({ params }) => <StoreView params={params} />;

EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
