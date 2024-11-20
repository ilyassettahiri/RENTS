import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Hire Professional Services in ${city} - Trusted Providers on RENTS.ma`,
    description: `Find skilled professionals for hire in ${city} on RENTS.ma. Connect with trustworthy providers offering a wide range of services to meet your needs. Explore the best options in ${city} today!`,
    keywords: `Professional services in ${city}, Hire skilled professionals in ${city}, ${city} service providers, Reliable services in ${city}, Services in ${city} on RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/services/${city}`,
      title: `Hire Professional Services in ${city} - Trusted Providers on RENTS.ma`,
      description: `Find reliable and skilled professionals offering services in ${city}. Discover the best service providers on RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
          width: 1200,
          height: 630,
          alt: `Hire Professional Services in ${city} - Trusted Providers on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hire Professional Services in ${city} - Trusted Providers on RENTS.ma`,
      description: `Find reliable and skilled professionals offering services in ${city}. Discover the best service providers on RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/services/${city}`,
      languages: {
        en: `https://rents.ma/en/services/${city}`,
        ar: `https://rents.ma/ar/services/${city}`,
        fr: `https://rents.ma/fr/services/${city}`,
      },
    },
  };
}



const ServicesPageCity = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-city-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Professional Services in ${city} | RENTS.ma`,
            url: `https://rents.ma/en/services/${city}`,
            description: `Explore trusted professional services in ${city}. Connect with skilled providers for your needs.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Home Maintenance Services',
                  url: `https://rents.ma/en/services/${city}/home-maintenance`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Personal Care Services',
                  url: `https://rents.ma/en/services/${city}/personal-care`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Cleaning Services',
                  url: `https://rents.ma/en/services/${city}/cleaning`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Services-Specific Content */}
      <ServicesListViewCity params={params} />
    </>
  );
};


ServicesPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,

  }).isRequired,
};

export default ServicesPageCity;
