import axios from 'axios';

import Script from 'next/script';

import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { category, type, city  } = params;


  return {
    title: `Best ${category} for Rent in ${city} - RENTS.ma`,
    description: `Discover this exclusive ${category} for rent in ${city}. Explore details and connect with trusted providers.`,

  };
}






export default async function ListingPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const listingEndpoint = `${API_URL}/listings/${params.category}/${params.url}`;

  try {
    // Fetch job data server-side
    const response = await axios.get(listingEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const listingData = response.data;


    return <ListingView params={params} listingData={listingData} />;
  } catch (error) {
    console.error('Error fetching Listing data:', error);


    return <ListingView params={params} listingData={null} />;
  }
}




ListingPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,


  }).isRequired,
};
