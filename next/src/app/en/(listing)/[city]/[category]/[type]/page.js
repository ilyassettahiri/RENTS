import HomeViewType from 'src/sections/home/home-view-city';

import Script from 'next/script';

import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { city, category, type } = params;

  return {
    title: `Find ${type} for Rent in ${city} - RENTS.ma`,
    description: `Explore top listings for ${type} rentals in ${city} on RENTS.ma. Find quality options and trusted providers to meet your needs in ${city}.`,
    keywords: `${type} rentals in ${city}, ${city} ${type} for rent, Best ${type} rentals in ${city}, Trusted ${type} rentals ${city}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/${city}/${category}/${type}`,
      title: `Find ${type} for Rent in ${city} - RENTS.ma`,
      description: `Explore trusted listings for ${type} rentals in ${city}. Find quality options from trusted providers on RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
          width: 1200,
          height: 630,
          alt: `Find ${type} for Rent in ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Find ${type} for Rent in ${city} - RENTS.ma`,
      description: `Discover top ${type} rental options in ${city} on RENTS.ma. From quality listings to trusted providers, find the best rentals available in ${city}.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/${city}/${category}/${type}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}/${type}`,
        ar: `https://rents.ma/ar/${city}/${category}/${type}`,
        fr: `https://rents.ma/fr/${city}/${category}/${type}`,
      },
    },
  };
}

const HomeTypePage = ({ params }) => {
  const { city, category, type } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="type-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${type} Rentals in ${city} | RENTS.ma`,
            url: `https://rents.ma/en/${city}/${category}/${type}`,
            description: `Explore the best ${type} rentals in ${city}. Discover trusted listings and providers on RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} Listing 1`,
                  url: `https://rents.ma/en/${city}/${category}/${type}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} Listing 2`,
                  url: `https://rents.ma/en/${city}/${category}/${type}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} Listing 3`,
                  url: `https://rents.ma/en/${city}/${category}/${type}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Content */}
      <HomeViewType params={params} />
    </>
  );
};

HomeTypePage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  }).isRequired,
};

export default HomeTypePage;
