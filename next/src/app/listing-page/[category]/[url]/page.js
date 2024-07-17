import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Tour',
};

const ListingPage = ({ params }) => <ListingView params={params} />;

ListingPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingPage;
