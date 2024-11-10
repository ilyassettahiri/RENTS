import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;


  return {
    title: `Hire Professional Services in ${city} - Trusted Providers on RENTS.ma`,
    description: `Find skilled professionals for hire in ${city} on RENTS.ma. Connect with trustworthy providers offering a wide range of services to meet your needs. Explore the best options in ${city} today!`,
  };

}


const ServicesPageCity = ({ params }) => <ServicesListViewCity params={params} />;

ServicesPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,

  }).isRequired,
};

export default ServicesPageCity;
