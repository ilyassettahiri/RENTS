import axios from 'axios';
import Script from 'next/script';


import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { category, type, city, url } = params;

  return {
    title: `Best ${category} for Rent in ${city} - ${type} Available | RENTS.ma`,
    description: `Discover this exclusive ${category} (${type}) for rent in ${city}. Explore details, pricing, and connect with trusted providers on RENTS.ma.`,
    keywords: `${category} rentals in ${city}, ${city} ${category} for rent, Best ${type} in ${city}, Trusted ${type} providers in ${city}`,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
      title: `Best ${category} for Rent in ${city} - ${type} Available | RENTS.ma`,
      description: `Discover exclusive ${category} (${type}) rentals in ${city}. Check details and contact trusted providers.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with listing-specific or generic image
          width: 1200,
          height: 630,
          alt: `Best ${category} for Rent in ${city} - ${type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Best ${category} for Rent in ${city} - ${type} Available | RENTS.ma`,
      description: `Discover this exclusive ${category} (${type}) rental in ${city}. Explore details and contact trusted providers.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with listing-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
      languages: {
        en: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
        ar: `https://rents.ma/ar/${city}/${category}/${type}/${url}`,
        fr: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
      },
    },
  };
}





export default async function ListingPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const listingEndpoint = `${API_URL}/listings/${params.category}/${params.url}`;
  const { city, category, type, url } = params;

  try {
    // Fetch job data server-side
    const response = await axios.get(listingEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const listingData = response.data;


    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="listing-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${category} for Rent - ${type} in ${city}`,
              url: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
              description: `Discover this exclusive ${category} (${type}) rental in ${city} on RENTS.ma.`,
              brand: {
                "@type": "Brand",
                name: "RENTS.ma",
              },
              offers: {
                "@type": "Offer",
                url: `https://rents.ma/en/${city}/${category}/${type}/${url}`,
                priceCurrency: "MAD", // Replace with the actual currency if needed
                price: listingData.data?.attributes?.price || "Contact for price",
                availability: "http://schema.org/InStock",
              },
            }),
          }}
        />
        {/* Render Listing Content */}
        <ListingView params={params} listingData={listingData} />
      </>
    );



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
