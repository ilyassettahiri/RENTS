import ServicePageView from 'src/sections/service-page/service-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `Hire ${type} in ${city} - RENTS.ma`,
    description: `Looking to hire ${type} services in ${city}? Discover all the details and connect with trusted providers on RENTS.ma`,
  };
}


const ServicePage = ({ params }) => <ServicePageView params={params} />;

ServicePage.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicePage;
