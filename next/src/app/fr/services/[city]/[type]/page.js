import ServicesListViewType from 'src/sections/services-list/services-list-view-type';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;

  return {
    title: `Engagez des Services Professionnels ${type} à ${city} - Prestations Fiables sur RENTS.ma`,
    description: `Besoin de services ${type} fiables à ${city} ? RENTS.ma vous met en relation avec des professionnels de confiance prêts à répondre à vos besoins.`,
    keywords: `Services professionnels ${type} à ${city}, Prestations ${type} à ${city}, Fournisseurs ${type} fiables ${city}, Engagez ${type} à ${city}, ${type} sur RENTS.ma`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/services/${city}/${type}`,
      title: `Engagez des Services Professionnels ${type} à ${city} - Prestations Fiables sur RENTS.ma`,
      description: `Découvrez des services ${type} fiables à ${city} sur RENTS.ma. Connectez-vous avec des professionnels qualifiés pour répondre à vos besoins.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Engagez des Services Professionnels ${type} à ${city} - Prestations Fiables sur RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Engagez des Services Professionnels ${type} à ${city} - Prestations Fiables sur RENTS.ma`,
      description: `Découvrez des services ${type} fiables à ${city} sur RENTS.ma. Connectez-vous avec des professionnels qualifiés pour répondre à vos besoins.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/services/${city}/${type}`,
      languages: {
        en: `https://rents.ma/en/services/${city}/${type}`,
        ar: `https://rents.ma/ar/services/${city}/${type}`,
        fr: `https://rents.ma/fr/services/${city}/${type}`,
      },
    },
  };
}



const ServicesPageType = ({ params }) => {
  const { city, type } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-type-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Services Professionnels ${type} à ${city} | RENTS.ma`,
            url: `https://rents.ma/fr/services/${city}/${type}`,
            description: `Trouvez des services ${type} fiables à ${city} sur RENTS.ma. Connectez-vous avec des professionnels qualifiés pour répondre à vos besoins.`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: `${type} Service 1`,
                  url: `https://rents.ma/fr/services/${city}/${type}/service1`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: `${type} Service 2`,
                  url: `https://rents.ma/fr/services/${city}/${type}/service2`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${type} Service 3`,
                  url: `https://rents.ma/fr/services/${city}/${type}/service3`,
                },
              ],
            },
          }),
        }}
      />
      {/* Render Type-Specific Content */}
      <ServicesListViewType params={params} />
    </>
  );
};


ServicesPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesPageType;
