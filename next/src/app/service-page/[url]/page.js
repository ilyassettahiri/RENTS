import ServicePageView from 'src/sections/service-page/service-page-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Job',
};





const ServicePage = ({ params }) => {
  return <ServicePageView params={params} />;
};

export default ServicePage;

