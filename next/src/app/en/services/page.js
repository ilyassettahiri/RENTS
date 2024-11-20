import ServicesView from 'src/sections/services-list/services-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {


  title: 'Services in Morocco - Trusted Providers on RENTS.ma',
  description: 'Discover a wide range of professional services across Morocco on RENTS.ma. From home maintenance to personal care, connect with reliable providers to meet your needs nationwide.',


};

export default function ServicesPage() {
  return <ServicesView />;
}
