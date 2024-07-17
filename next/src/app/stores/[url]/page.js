import StoreView from 'src/sections/store/store-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-commerce: Home',
};





const EcommerceLandingPage = ({ params }) => {
  return <StoreView params={params} />;
};

export default EcommerceLandingPage;

