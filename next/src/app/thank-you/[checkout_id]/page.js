import ThankYouView from 'src/sections/thank-you/thank-you-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Order Completed',
};



const ThankYouPage = ({ params }) => {
  return <ThankYouView params={params} />;
};

export default ThankYouPage;
