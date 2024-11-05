import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { category, type, city  } = params;


  return {
    title: `Best ${category} for Rent in ${city} - RENTS.ma`,
    description: `Discover this exclusive ${category} for rent in ${city}. Explore details and connect with trusted providers.`,

  };
}

const ListingPage = ({ params }) => <ListingView params={params} />;

ListingPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default ListingPage;
