import CheckoutView from 'src/sections/checkout/checkout-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Travel: Checkout',
};



const CheckoutPage = ({ params }) => {
  return <CheckoutView params={params} />;
};

export default CheckoutPage;
