import axios from 'axios';

import Script from 'next/script';
import { cookies } from 'next/headers';

import ListingView from 'src/sections/listing-page/listing-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { category, type, city, url } = params;

  return {
    title: `Meilleur ${category} à louer à ${city} - ${type} disponible | RENTS.ma`,
    description: `Découvrez ce ${category} exclusif (${type}) à louer à ${city}. Explorez les détails, les prix et connectez-vous avec des fournisseurs de confiance sur RENTS.ma.`,
    keywords: `${category} à louer à ${city}, ${city} ${category} en location, Meilleur ${type} à ${city}, Fournisseurs fiables de ${type} à ${city}`,
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
      title: `Meilleur ${category} à louer à ${city} - ${type} disponible | RENTS.ma`,
      description: `Découvrez des locations exclusives de ${category} (${type}) à ${city}. Consultez les détails et contactez des fournisseurs fiables.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with listing-specific or generic image
          width: 1200,
          height: 630,
          alt: `Meilleur ${category} à louer à ${city} - ${type}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Meilleur ${category} à louer à ${city} - ${type} disponible | RENTS.ma`,
      description: `Découvrez ce ${category} exclusif (${type}) en location à ${city}. Explorez les détails et contactez des fournisseurs fiables.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with listing-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
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

  const authToken = cookies().get('authToken')?.value;


  try {
    // Fetch job data server-side
    const response = await axios.get(listingEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
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
              name: `${category} à louer - ${type} à ${city}`,
              url: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
              description: `Découvrez ce ${category} exclusif (${type}) en location à ${city} sur RENTS.ma.`,
              brand: {
                "@type": "Brand",
                name: "RENTS.ma",
              },
              offers: {
                "@type": "Offer",
                url: `https://rents.ma/fr/${city}/${category}/${type}/${url}`,
                priceCurrency: "MAD", // Replace with the actual currency if needed
                price: listingData.data?.attributes?.price || "Contactez pour le prix",
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
