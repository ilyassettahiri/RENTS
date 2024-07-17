import BusinessPageView from 'src/sections/business-page/business-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-learning: Course',
};

const BusinessPage = ({ params }) => <BusinessPageView params={params} />;

export default BusinessPage;

BusinessPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,

  }).isRequired,
};
