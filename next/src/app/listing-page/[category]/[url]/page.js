import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// Dynamically generate metadata based on `params`
export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `Rents.ma - ${url}`, // Customize the title as needed
  };
}

const ListingPage = ({ params }) => <ListingView params={params} />;

ListingPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingPage;
