import axios from 'axios';
import Script from 'next/script';

import PrivacyView from 'src/sections/privacy/privacy-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Politique de Confidentialité - RENTS.ma | Vos Données, Notre Responsabilité',
    description: 'Découvrez comment RENTS.ma gère vos données avec transparence et soin. Consultez notre politique de confidentialité pour comprendre vos droits et nos pratiques.',
    keywords: 'Politique de confidentialité, Confidentialité RENTS.ma, Protection des données, Données personnelles, Plateforme de location confidentialité',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/privacy-policy',
      title: 'Politique de Confidentialité - RENTS.ma | Vos Données, Notre Responsabilité',
      description: 'Comprenez comment RENTS.ma protège vos données et vos droits. La transparence et le soin sont au cœur de nos pratiques.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: 'Politique de Confidentialité - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Politique de Confidentialité - RENTS.ma | Vos Données, Notre Responsabilité',
      description: 'Découvrez comment RENTS.ma gère vos informations personnelles avec soin et transparence.',
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: 'https://rents.ma/fr/privacy-policy',
      languages: {
        en: 'https://rents.ma/en/privacy-policy',
        ar: 'https://rents.ma/ar/privacy-policy',
        fr: 'https://rents.ma/fr/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const termData = response.data;

    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="privacy-policy-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'Politique de Confidentialité - RENTS.ma',
              url: 'https://rents.ma/fr/privacy-policy',
              description: 'Découvrez comment RENTS.ma gère vos informations personnelles avec transparence et soin.',
            }),
          }}
        />
        {/* Render Privacy Policy Content */}
        <PrivacyView termData={termData} />
      </>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);

    return <PrivacyView termData={null} />;
  }
}
