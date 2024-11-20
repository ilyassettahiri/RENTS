import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `${url} Store - RENTS.ma | Discover Trusted Businesses`,
    description: `Explore the ${url} store on RENTS.ma. Discover trusted rentals for cars, properties, equipment, and more.`,
    keywords: `${url} store, Trusted businesses, Rental services, ${url} rentals`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/store/${url}`,
      title: `${url} Store - RENTS.ma | Discover Trusted Businesses`,
      description: `Explore the ${url} store on RENTS.ma. Discover trusted rentals for cars, properties, equipment, and more.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a store-specific or generic image
          width: 1200,
          height: 630,
          alt: `${url} Store - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${url} Store - RENTS.ma | Discover Trusted Businesses`,
      description: `Discover trusted rentals and services at ${url} on RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a store-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/store/${url}`,
      languages: {
        en: `https://rents.ma/en/store/${url}`,
        ar: `https://rents.ma/ar/store/${url}`,
        fr: `https://rents.ma/fr/store/${url}`,
      },
    },
  };
}



const EcommerceLandingPage = ({ params }) => {
  const { url } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="store-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${url} Store - RENTS.ma`,
            url: `https://rents.ma/store/${url}`,
            description: `Discover trusted rentals and services at ${url} on RENTS.ma.`,
          }),
        }}
      />
      {/* Render Store Content */}
      <StoreView params={params} />
    </>
  );
};


EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
