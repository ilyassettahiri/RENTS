import BusinessPageView from 'src/sections/business-page/business-page-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'E-learning: Course',
};



const BusinessPage = ({ params }) => {
  return <BusinessPageView params={params} />;
};

export default BusinessPage;

