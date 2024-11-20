import HomeViewCategory from 'src/sections/home/home-view-category';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city, category } = params;

  return {
    title: `Trouvez ${category} à louer à ${city} - RENTS.ma`,
    description: `Découvrez les meilleures options de location de ${category} à ${city} sur RENTS.ma. Des annonces de qualité et des fournisseurs de confiance vous attendent à ${city}.`,
    keywords: `Locations de ${category} à ${city}, ${category} à louer à ${city}, Meilleures locations de ${category} à ${city}, Locations de confiance de ${category} à ${city}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/${city}/${category}`,
      title: `Trouvez ${category} à louer à ${city} - RENTS.ma`,
      description: `Explorez les meilleures options de location de ${category} à ${city} sur RENTS.ma. Des annonces de qualité et des fournisseurs de confiance vous attendent.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a category-specific or generic image
          width: 1200,
          height: 630,
          alt: `Trouvez ${category} à louer à ${city} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Trouvez ${category} à louer à ${city} - RENTS.ma`,
      description: `Découvrez les meilleures options de location de ${category} à ${city} sur RENTS.ma. Des annonces de qualité et des fournisseurs de confiance vous attendent.`,
      image: '/favicon/android-chrome-512x512.png', // Replace with a category-specific or generic image
    },
    alternates: {
      canonical: `https://rents.ma/fr/${city}/${category}`,
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
            name: `Locations de ${category} à ${city} | RENTS.ma`,
            url: `https://rents.ma/fr/${city}/${category}`,
            description: `Explorez les meilleures locations de ${category} à ${city}. Découvrez des annonces fiables et des fournisseurs sur RENTS.ma.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${category} Annonce 1`,
                  url: `https://rents.ma/fr/${city}/${category}/annonce1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${category} Annonce 2`,
                  url: `https://rents.ma/fr/${city}/${category}/annonce2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${category} Annonce 3`,
                  url: `https://rents.ma/fr/${city}/${category}/annonce3`,
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
