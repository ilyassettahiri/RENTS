import ContactView from 'src/sections/contact/contact-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Contact us',
};

export default function ContactPage() {
  return <ContactView />;
}
