
import axios from 'axios';


import AboutView from 'src/sections/about/about-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'About us',
};

export default async function AboutPage() {





  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const aboutsEndpoint = `${API_URL}/abouts`;

  try {

    const response = await axios.get(aboutsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    const aboutData = response.data;
    return <AboutView aboutData={aboutData} />;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <AboutView aboutData={null} />;

  }


}
