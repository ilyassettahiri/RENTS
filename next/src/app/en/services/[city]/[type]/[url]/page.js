import axios from 'axios';
import Script from 'next/script';


import ServicePageView from 'src/sections/service-page/service-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type, url } = params;

  return {
    title: `Hire ${type} in ${city} - Trusted Services on RENTS.ma`,
    description: `Discover all the details about ${type} services in ${city}. Connect with trusted providers on RENTS.ma for reliable and professional services.`,
    keywords: `${type} in ${city}, Hire ${type} in ${city}, Reliable ${type} services ${city}, ${type} professionals ${city}, ${type} on RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/services/${city}/${type}/${url}`,
      title: `Hire ${type} in ${city} - Trusted Services on RENTS.ma`,
      description: `Discover trusted ${type} services in ${city}. View details and connect with professionals on RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
          width: 1200,
          height: 630,
          alt: `Hire ${type} in ${city} - Trusted Services on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hire ${type} in ${city} - Trusted Services on RENTS.ma`,
      description: `Discover trusted ${type} services in ${city}. View details and connect with professionals on RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/services/${city}/${type}/${url}`,
      languages: {
        en: `https://rents.ma/en/services/${city}/${type}/${url}`,
        ar: `https://rents.ma/ar/services/${city}/${type}/${url}`,
        fr: `https://rents.ma/fr/services/${city}/${type}/${url}`,
      },
    },
  };
}







export default async function ServicePage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const serviceEndpoint = `${API_URL}/services/${params.url}`;
  const { city, type, url } = params;

  try {
    // Fetch job data server-side
    const response = await axios.get(serviceEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const serviceData = response.data;


    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="service-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${type} in ${city}`,
              description: `Details about ${type} services in ${city}. Connect with trusted providers on RENTS.ma.`,
              provider: {
                "@type": "Organization",
                name: "RENTS.ma",
                url: "https://rents.ma",
              },
              areaServed: city,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rents.ma/en/services/${city}/${type}/${url}`,
              },
            }),
          }}
        />
        <ServicePageView params={params} serviceData={serviceData} />
      </>
    );


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
