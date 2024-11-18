
import axios from 'axios';

import HomeView from 'src/sections/home/home-view';

// ----------------------------------------------------------------------



export const metadata = {
  title: 'RENTS.ma: Discover Morocco’s Leading Marketplace for Rentals - Cars, Bikes, Properties & More',
  description: 'Explore RENTS.ma, Morocco’s top rental marketplace offering a wide range of rental options including cars, bikes, properties, and equipment. Find trusted rentals with flexible terms across Morocco’s popular cities like Marrakech, Casablanca, and beyond.',




};

export default async function HomePage() {






  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const homeEndpoint = `${API_URL}/home`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(homeEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const homeData = response.data;
    return <HomeView homeData={homeData} />;
  } catch (error) {
    console.error('Error fetching homeData:', error);


    return <HomeView homeData={null} />;
  }




}
