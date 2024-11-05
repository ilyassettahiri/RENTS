import ServicesListViewType from 'src/sections/services-list/services-list-view-type';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { type } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${type}`, // Customize the title as needed
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
