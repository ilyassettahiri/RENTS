import StoreView from 'src/sections/store/store-view';
import PropTypes from 'prop-types';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  return {
    title: `Magasin ${url} - RENTS.ma | Découvrez des Entreprises de Confiance`,
    description: `Explorez le magasin ${url} sur RENTS.ma. Découvrez des locations fiables pour voitures, propriétés, équipements et plus encore.`,
    keywords: `Magasin ${url}, Entreprises de confiance, Services de location, Locations ${url}`,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: `https://rents.ma/fr/store/${url}`,
      title: `Magasin ${url} - RENTS.ma | Découvrez des Entreprises de Confiance`,
      description: `Explorez le magasin ${url} sur RENTS.ma. Découvrez des locations fiables pour voitures, propriétés, équipements et plus encore.`,
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: `Magasin ${url} - RENTS.ma`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Magasin ${url} - RENTS.ma | Découvrez des Entreprises de Confiance`,
      description: `Découvrez des services et des locations fiables au magasin ${url} sur RENTS.ma.`,
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: `https://rents.ma/fr/store/${url}`,
      languages: {
        en: `https://rents.ma/en/store/${url}`,
        ar: `https://rents.ma/ar/store/${url}`,
        fr: `https://rents.ma/fr/store/${url}`,
      },
    },
  };
}



const EcommerceLandingPage = ({ params }) => {
  const { url } = params;

  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="store-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Magasin ${url} - RENTS.ma`,
            url: `https://rents.ma/fr/store/${url}`,
            description: `Découvrez des services et des locations fiables au magasin ${url} sur RENTS.ma.`,
          }),
        }}
      />
      {/* Render Store Content */}
      <StoreView params={params} />
    </>
  );
};

EcommerceLandingPage.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EcommerceLandingPage;
