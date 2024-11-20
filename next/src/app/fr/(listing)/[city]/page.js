import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Explorez les locations à ${city} - Voitures, équipements et plus | RENTS.ma`,
    description: `Découvrez les meilleures options de location à ${city} avec RENTS.ma. Louez des véhicules, outils, électroniques, et plus auprès de fournisseurs de confiance.`,
    keywords: `Locations à ${city}, Locations de voitures à ${city}, Locations d’équipements à ${city}, Outils à louer à ${city}, Électroniques à louer à ${city}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/${city}`,
      title: `Explorez les locations à ${city} - Voitures, équipements et plus | RENTS.ma`,
      description: `Découvrez les meilleures options de location à ${city} avec RENTS.ma. Louez des véhicules, outils, électroniques, et plus auprès de fournisseurs de confiance.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
          width: 1200,
          height: 630,
          alt: `Explorez les locations à ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Explorez les locations à ${city} - Voitures, équipements et plus | RENTS.ma`,
      description: `Découvrez les meilleures options de location à ${city} avec RENTS.ma. Louez des véhicules, outils, électroniques, et plus auprès de fournisseurs de confiance.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a city-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/fr/${city}`,
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
            name: `Locations à ${city} | RENTS.ma`,
            url: `https://rents.ma/fr/${city}`,
            description: `Trouvez des voitures, outils, électroniques, et plus à louer à ${city}. Fournisseurs de confiance sur RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Voitures à louer",
                  url: `https://rents.ma/fr/${city}/cars`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Outils à louer",
                  url: `https://rents.ma/fr/${city}/tools`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Électroniques à louer",
                  url: `https://rents.ma/fr/${city}/electronics`,
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
