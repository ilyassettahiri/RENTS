import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${city}`, // Customize the title as needed
  };
}


const ServicesPageCity = ({ params }) => <ServicesListViewCity params={params} />;

ServicesPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,

  }).isRequired,
};

export default ServicesPageCity;
