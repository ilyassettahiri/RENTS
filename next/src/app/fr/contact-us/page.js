
import axios from 'axios';

import ContactView from 'src/sections/contact/contact-view';


export const metadata = {
  title: 'Contact us',
};

export default async function ContactPage() {



  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const contactsEndpoint = `${API_URL}/contacts`;


  try {
    // Fetch data server-side with Axios
    const response = await axios.get(contactsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Pass the fetched data to ContactView
    const contactData = response.data;
    return <ContactView contactData={contactData} />;
  } catch (error) {
    console.error('Error fetching contact data:', error);


  }


  return <ContactView />;
}
