import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Explore Rentals in ${city} - Cars, Equipment, and More | RENTS.ma`,
    description: `Discover the best rental options in ${city} with RENTS.ma. Rent vehicles, tools, electronics, and more from trusted providers.`,
    keywords: `Rentals in ${city}, Car rentals in ${city}, Equipment rentals in ${city}, Tools for rent in ${city}, Electronics rentals in ${city}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/${city}`,
      title: `Explore Rentals in ${city} - Cars, Equipment, and More | RENTS.ma`,
      description: `Discover the best rental options in ${city} with RENTS.ma. Rent vehicles, tools, electronics, and more from trusted providers.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
          width: 1200,
          height: 630,
          alt: `Explore Rentals in ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Explore Rentals in ${city} - Cars, Equipment, and More | RENTS.ma`,
      description: `Discover the best rental options in ${city} with RENTS.ma. Rent vehicles, tools, electronics, and more from trusted providers.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/${city}`,
      languages: {
        en: `https://rents.ma/en/${city}`,
        ar: `https://rents.ma/ar/${city}`,
        fr: `https://rents.ma/fr/${city}`,
      },
    },
  };
}

const HomeCityPage = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="city-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Rentals in ${city} | RENTS.ma`,
            url: `https://rents.ma/en/${city}`,
            description: `Find cars, tools, electronics, and more for rent in ${city}. Trusted providers on RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Cars for rent",
                  url: `https://rents.ma/en/${city}/cars`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Tools for rent",
                  url: `https://rents.ma/en/${city}/tools`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Electronics for rent",
                  url: `https://rents.ma/en/${city}/electronics`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render City-Specific Content */}
      <HomeViewCity params={params} />
    </>
  );
};


HomeCityPage.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCityPage;
