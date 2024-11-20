import ServicesListViewType from 'src/sections/services-list/services-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `Hire Professional ${type} in ${city} - Trusted Services on RENTS.ma`,
    description: `Need reliable ${type} services in ${city}? RENTS.ma connects you with trusted professionals ready to meet your needs.`,
    keywords: `Professional ${type} in ${city}, ${type} services ${city}, Reliable ${type} providers ${city}, Hire ${type} in ${city}, ${type} on RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/services/${city}/${type}`,
      title: `Hire Professional ${type} in ${city} - Trusted Services on RENTS.ma`,
      description: `Find reliable ${type} services in ${city} on RENTS.ma. Connect with skilled professionals to meet your needs.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
          width: 1200,
          height: 630,
          alt: `Hire Professional ${type} in ${city} - Trusted Services on RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hire Professional ${type} in ${city} - Trusted Services on RENTS.ma`,
      description: `Find reliable ${type} services in ${city} on RENTS.ma. Connect with skilled professionals to meet your needs.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/services/${city}/${type}`,
      languages: {
        en: `https://rents.ma/en/services/${city}/${type}`,
        ar: `https://rents.ma/ar/services/${city}/${type}`,
        fr: `https://rents.ma/fr/services/${city}/${type}`,
      },
    },
  };
}


const ServicesPageType = ({ params }) => {
  const { city, type } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-type-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Professional ${type} in ${city} | RENTS.ma`,
            url: `https://rents.ma/en/services/${city}/${type}`,
            description: `Find reliable ${type} services in ${city} on RENTS.ma. Connect with skilled professionals to meet your needs.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} Service 1`,
                  url: `https://rents.ma/en/services/${city}/${type}/service1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} Service 2`,
                  url: `https://rents.ma/en/services/${city}/${type}/service2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} Service 3`,
                  url: `https://rents.ma/en/services/${city}/${type}/service3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Content */}
      <ServicesListViewType params={params} />
    </>
  );
};

ServicesPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageType;
