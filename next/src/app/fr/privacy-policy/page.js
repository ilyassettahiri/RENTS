import axios from 'axios';


import PrivacyView from 'src/sections/privacy/privacy-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Privacy Policy',
};

export default async function PrivacyPage() {



  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const termData = response.data;
    return <PrivacyView termData={termData} />;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <PrivacyView termData={null} />;
  }


}
