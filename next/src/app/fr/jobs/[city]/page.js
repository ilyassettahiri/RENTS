import JobsListViewCity from 'src/sections/jobs-list/jobs-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Emplois à ${city} - Trouvez des Opportunités sur RENTS.ma`,
    description: `Explorez les dernières opportunités d’emploi à ${city} sur RENTS.ma. Découvrez des postes dans divers secteurs et connectez-vous avec les meilleurs employeurs à ${city}. Commencez votre recherche d’emploi dès aujourd’hui!`,
    keywords: `Emplois à ${city}, Opportunités d’emploi à ${city}, Carrières à ${city}, Offres d’emploi ${city}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/jobs/${city}`,
      title: `Emplois à ${city} - Trouvez des Opportunités sur RENTS.ma`,
      description: `Découvrez les meilleures opportunités d’emploi à ${city}. Explorez divers secteurs et connectez-vous avec des employeurs de confiance sur RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique aux emplois ou générique
          width: 1200,
          height: 630,
          alt: `Emplois à ${city} - Trouvez des Opportunités sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Emplois à ${city} - Trouvez des Opportunités sur RENTS.ma`,
      description: `Explorez des opportunités d’emploi à ${city}. Découvrez des postes dans divers secteurs et connectez-vous avec les meilleurs employeurs.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique aux emplois ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/jobs/${city}`,
      languages: {
        en: `https://rents.ma/en/jobs/${city}`,
        ar: `https://rents.ma/ar/jobs/${city}`,
        fr: `https://rents.ma/fr/jobs/${city}`,
      },
    },
  };
}


const JobsPageCity = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-city-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Emplois à ${city} - RENTS.ma`,
            url: `https://rents.ma/fr/jobs/${city}`,
            description: `Trouvez des opportunités d’emploi à ${city} dans divers secteurs. Connectez-vous avec les meilleurs employeurs et découvrez votre prochaine carrière.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Emplois Développeur Logiciel',
                  url: `https://rents.ma/fr/jobs/${city}/developpeur-logiciel`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Emplois Marketing',
                  url: `https://rents.ma/fr/jobs/${city}/marketing`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Emplois Vente',
                  url: `https://rents.ma/fr/jobs/${city}/vente`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render City-Specific Jobs Content */}
      <JobsListViewCity params={params} />
    </>
  );
};


JobsPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageCity;
