
import axios from 'axios';


import FaqsView from 'src/sections/faqs/faqs-view';


export const metadata = {
  title: 'Help Center',
};

export default async function FaqsPage() {




  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const faqDatasEndpoint = `${API_URL}/faqs`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(faqDatasEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const faqData = response.data;
    return <FaqsView faqData={faqData} />;
  } catch (error) {
    console.error('Error fetching faq:', error);


    return <FaqsView faqData={null} />;
  }




}
