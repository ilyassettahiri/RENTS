import HomeViewCategory from 'src/sections/home/home-view-category';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city, category } = params;

  return {
    title: `Find ${category} for Rent in ${city} - RENTS.ma`,
    description: `Discover top ${category} rental options in ${city} on RENTS.ma. From quality listings to trusted providers, find the best rentals available in ${city}.`,
    keywords: `${category} rentals in ${city}, ${city} ${category} for rent, Best ${category} rentals ${city}, Trusted ${category} rentals in ${city}`,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://rents.ma/en/${city}/${category}`,
      title: `Find ${category} for Rent in ${city} - RENTS.ma`,
      description: `Explore trusted ${category} rental options in ${city} on RENTS.ma. Find the best listings from trusted providers.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a category-specific or generic image
          width: 1200,
          height: 630,
          alt: `Find ${category} for Rent in ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Find ${category} for Rent in ${city} - RENTS.ma`,
      description: `Discover top ${category} rental options in ${city} on RENTS.ma. From quality listings to trusted providers, find the best rentals available in ${city}.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a category-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/${city}/${category}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}`,
        ar: `https://rents.ma/ar/${city}/${category}`,
        fr: `https://rents.ma/fr/${city}/${category}`,
      },
    },
  };
}

const HomeCategoryPage = ({ params }) => {
  const { city, category } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="category-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${category} Rentals in ${city} | RENTS.ma`,
            url: `https://rents.ma/en/${city}/${category}`,
            description: `Explore the best ${category} rentals in ${city}. Discover trusted listings and providers on RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${category} Listing 1`,
                  url: `https://rents.ma/en/${city}/${category}/listing1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${category} Listing 2`,
                  url: `https://rents.ma/en/${city}/${category}/listing2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${category} Listing 3`,
                  url: `https://rents.ma/en/${city}/${category}/listing3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Category-Specific Content */}
      <HomeViewCategory params={params} />
    </>
  );
};

HomeCategoryPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCategoryPage;
