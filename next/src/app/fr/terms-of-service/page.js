import axios from 'axios';
import Script from 'next/script';

import TermconditionView from 'src/sections/termcondition/termcondition-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Conditions Générales - RENTS.ma | Politiques de la Plateforme de Location',
    description: 'Lisez les conditions générales d’utilisation de RENTS.ma. Découvrez nos politiques, règles et directives pour une expérience fluide.',
    keywords: 'Conditions générales, Termes et règles RENTS.ma, Politiques de service, Règles de la plateforme de location',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/terms-of-service',
      title: 'Conditions Générales - RENTS.ma | Politiques de la Plateforme de Location',
      description: 'Découvrez les termes et politiques qui régissent l’utilisation de RENTS.ma, la principale plateforme de location au Maroc.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: 'Conditions Générales - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Conditions Générales - RENTS.ma | Politiques de la Plateforme de Location',
      description: 'Apprenez-en davantage sur les règles et directives pour utiliser RENTS.ma. Explorez nos conditions générales pour une expérience optimale.',
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: 'https://rents.ma/fr/terms-of-service',
      languages: {
        en: 'https://rents.ma/en/terms-of-service',
        ar: 'https://rents.ma/ar/terms-of-service',
        fr: 'https://rents.ma/fr/terms-of-service',
      },
    },
  };
}

export default async function TermconditionPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const termData = response.data;

    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="terms-of-service-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'Conditions Générales - RENTS.ma',
              url: 'https://rents.ma/fr/terms-of-service',
              description: 'Découvrez les termes et politiques pour utiliser RENTS.ma, la principale plateforme de location au Maroc.',
            }),
          }}
        />
        {/* Render Terms of Service Content */}
        <TermconditionView termData={termData} />
      </>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des conditions générales:', error);
    return <TermconditionView termData={null} />;
  }
}
