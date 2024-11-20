import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------


export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `Emplois ${type} à ${city} - Opportunités sur RENTS.ma`,
    description: `Découvrez les meilleures offres d’emploi ${type} à ${city} sur RENTS.ma. Trouvez des postes adaptés à vos compétences et connectez-vous avec des employeurs de confiance à ${city} pour faire progresser votre carrière.`,
    keywords: `Emplois ${type} à ${city}, Offres d’emploi ${type} ${city}, Carrières dans ${type} à ${city}, Opportunités d’emploi ${type} à ${city}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/jobs/${city}/${type}`,
      title: `Emplois ${type} à ${city} - Opportunités sur RENTS.ma`,
      description: `Explorez les meilleures opportunités d’emploi ${type} à ${city} sur RENTS.ma. Trouvez des postes adaptés à vos compétences et connectez-vous avec des employeurs de confiance.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Emplois ${type} à ${city} - Opportunités sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Emplois ${type} à ${city} - Opportunités sur RENTS.ma`,
      description: `Découvrez les meilleures opportunités d’emploi ${type} à ${city}. Trouvez des postes adaptés à vos compétences et connectez-vous avec des employeurs de confiance.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/jobs/${city}/${type}`,
      languages: {
        en: `https://rents.ma/en/jobs/${city}/${type}`,
        ar: `https://rents.ma/ar/jobs/${city}/${type}`,
        fr: `https://rents.ma/fr/jobs/${city}/${type}`,
      },
    },
  };
}

const JobsPageType = ({ params }) => {
  const { city, type } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-type-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Emplois ${type} à ${city} - RENTS.ma`,
            url: `https://rents.ma/fr/jobs/${city}/${type}`,
            description: `Découvrez les meilleures offres d’emploi ${type} à ${city}. Trouvez des postes adaptés à vos compétences et connectez-vous avec des employeurs de confiance.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `Offre d’emploi ${type} 1`,
                  url: `https://rents.ma/fr/jobs/${city}/${type}/offre1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `Offre d’emploi ${type} 2`,
                  url: `https://rents.ma/fr/jobs/${city}/${type}/offre2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `Offre d’emploi ${type} 3`,
                  url: `https://rents.ma/fr/jobs/${city}/${type}/offre3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Jobs Content */}
      <JobsListViewType params={params} />
    </>
  );
};


JobsPageType.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageType;
