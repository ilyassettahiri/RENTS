import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${url}`, // Customize the title as needed
  };
}


const ServicesPageCity = ({ params }) => <ServicesListViewCity params={params} />;

ServicesPageCity.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageCity;
