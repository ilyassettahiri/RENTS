import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `Rents.ma - ${url}`, // Customize the title as needed
  };
}


const EcommerceLandingPage = ({ params }) => <StoreView params={params} />;

EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
