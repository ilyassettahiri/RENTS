import axios from 'axios';

import Script from 'next/script';

import ServicePageView from 'src/sections/service-page/service-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `Hire ${type} in ${city} - RENTS.ma`,
    description: `Looking to hire ${type} services in ${city}? Discover all the details and connect with trusted providers on RENTS.ma`,
  };
}







export default async function ServicePage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const serviceEndpoint = `${API_URL}/services/${params.url}`;

  try {
    // Fetch job data server-side
    const response = await axios.get(serviceEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const serviceData = response.data;


    return <ServicePageView params={params} serviceData={serviceData} />;
  } catch (error) {
    console.error('Error fetching service data:', error);


    return <ServicePageView params={params} serviceData={null} />;
  }
}

ServicePage.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
