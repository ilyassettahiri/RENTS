import axios from 'axios';

import Script from 'next/script';
import { cookies } from 'next/headers';

import ServicePageView from 'src/sections/service-page/service-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type, url } = params;

  return {
    title: `Engagez ${type} à ${city} - Services Fiables sur RENTS.ma`,
    description: `Découvrez tous les détails sur les services ${type} à ${city}. Connectez-vous avec des prestataires de confiance sur RENTS.ma pour des services fiables et professionnels.`,
    keywords: `${type} à ${city}, Engagez ${type} à ${city}, Services ${type} fiables ${city}, Professionnels ${type} ${city}, ${type} sur RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/services/${city}/${type}/${url}`,
      title: `Engagez ${type} à ${city} - Services Fiables sur RENTS.ma`,
      description: `Découvrez des services ${type} fiables à ${city}. Consultez les détails et connectez-vous avec des professionnels sur RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Engagez ${type} à ${city} - Services Fiables sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Engagez ${type} à ${city} - Services Fiables sur RENTS.ma`,
      description: `Découvrez des services ${type} fiables à ${city}. Consultez les détails et connectez-vous avec des professionnels sur RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/services/${city}/${type}/${url}`,
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
  const authToken = cookies().get('authToken')?.value;

  try {
    // Fetch job data server-side
    const response = await axios.get(serviceEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
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
              name: `${type} à ${city}`,
              description: `Détails sur les services ${type} à ${city}. Connectez-vous avec des prestataires de confiance sur RENTS.ma.`,
              provider: {
                "@type": "Organization",
                name: "RENTS.ma",
                url: "https://rents.ma",
              },
              areaServed: city,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rents.ma/fr/services/${city}/${type}/${url}`,
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
