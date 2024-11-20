import HomeViewType from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';

import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { city, category, type } = params;

  return {
    title: `Louez ${type} à ${city} - RENTS.ma`,
    description: `Explorez les meilleures annonces de location de ${type} à ${city} sur RENTS.ma. Trouvez des options de qualité et des fournisseurs de confiance pour répondre à vos besoins à ${city}.`,
    keywords: `Locations de ${type} à ${city}, ${city} ${type} à louer, Meilleures locations de ${type} à ${city}, Locations de ${type} fiables à ${city}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/${city}/${category}/${type}`,
      title: `Louez ${type} à ${city} - RENTS.ma`,
      description: `Explorez des annonces fiables pour la location de ${type} à ${city}. Trouvez des options de qualité auprès de fournisseurs de confiance sur RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
          width: 1200,
          height: 630,
          alt: `Louez ${type} à ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Louez ${type} à ${city} - RENTS.ma`,
      description: `Découvrez les meilleures options de location de ${type} à ${city} sur RENTS.ma. Trouvez des annonces de qualité et des fournisseurs fiables à ${city}.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a type-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/fr/${city}/${category}/${type}`,
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
            name: `${type} à louer à ${city} | RENTS.ma`,
            url: `https://rents.ma/fr/${city}/${category}/${type}`,
            description: `Explorez les meilleures locations de ${type} à ${city}. Découvrez des annonces fiables et des fournisseurs sur RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} Annonce 1`,
                  url: `https://rents.ma/fr/${city}/${category}/${type}/annonce1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} Annonce 2`,
                  url: `https://rents.ma/fr/${city}/${category}/${type}/annonce2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} Annonce 3`,
                  url: `https://rents.ma/fr/${city}/${category}/${type}/annonce3`,
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
