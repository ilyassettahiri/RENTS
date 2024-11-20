import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;


  return {
    title: `${url}`,
  };
}


const EcommerceLandingPage = ({ params }) => <StoreView params={params} />;

EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
