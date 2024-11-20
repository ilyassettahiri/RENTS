import ServicesListViewCity from 'src/sections/services-list/services-list-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  return {
    title: `Trouvez des Services Professionnels à ${city} - Prestataires de Confiance sur RENTS.ma`,
    description: `Découvrez des professionnels qualifiés à ${city} sur RENTS.ma. Connectez-vous avec des prestataires fiables offrant une large gamme de services pour répondre à vos besoins. Explorez les meilleures options à ${city} dès aujourd’hui !`,
    keywords: `Services professionnels à ${city}, Engagez des professionnels qualifiés à ${city}, Prestataires de services à ${city}, Services fiables à ${city}, Services à ${city} sur RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/services/${city}`,
      title: `Trouvez des Services Professionnels à ${city} - Prestataires de Confiance sur RENTS.ma`,
      description: `Trouvez des professionnels fiables et qualifiés offrant des services à ${city}. Découvrez les meilleurs prestataires sur RENTS.ma.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Trouvez des Services Professionnels à ${city} - Prestataires de Confiance sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Trouvez des Services Professionnels à ${city} - Prestataires de Confiance sur RENTS.ma`,
      description: `Trouvez des professionnels fiables et qualifiés offrant des services à ${city}. Découvrez les meilleurs prestataires sur RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/services/${city}`,
      languages: {
        en: `https://rents.ma/en/services/${city}`,
        ar: `https://rents.ma/ar/services/${city}`,
        fr: `https://rents.ma/fr/services/${city}`,
      },
    },
  };
}



const ServicesPageCity = ({ params }) => {
  const { city } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-city-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Services Professionnels à ${city} | RENTS.ma`,
            url: `https://rents.ma/fr/services/${city}`,
            description: `Découvrez des services professionnels fiables à ${city}. Connectez-vous avec des prestataires qualifiés pour vos besoins.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Services d’Entretien de Maison',
                  url: `https://rents.ma/fr/services/${city}/entretien-maison`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Services de Soins Personnels',
                  url: `https://rents.ma/fr/services/${city}/soins-personnels`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Services de Nettoyage',
                  url: `https://rents.ma/fr/services/${city}/nettoyage`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Services-Specific Content */}
      <ServicesListViewCity params={params} />
    </>
  );
};


ServicesPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,

  }).isRequired,
};

export default ServicesPageCity;
