import ListingView from 'src/sections/listing-page/listing-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Tour',
};

const ListingPage = ({ params }) => {
  return <ListingView params={params} />;
};

export default ListingPage;

