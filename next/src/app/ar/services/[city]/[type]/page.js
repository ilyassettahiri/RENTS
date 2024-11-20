import ServicesListViewType from 'src/sections/services-list/services-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `Hire Professional ${type} in ${city} - Trusted Services on RENTS.ma`,
    description: `Need reliable ${type} services in ${city}? RENTS.ma connects you with trusted professionals ready to meet your needs.`,
  };

}


const ServicesPageType = ({ params }) => <ServicesListViewType params={params} />;

ServicesPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageType;
