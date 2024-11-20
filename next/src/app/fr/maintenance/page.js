import MaintenanceView from 'src/sections/status/maintenance-view';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    title: 'En Maintenance - RENTS.ma | Nous serons bientôt de retour',
    description: 'RENTS.ma est actuellement en maintenance. Nous serons bientôt de retour avec des fonctionnalités et des services améliorés.',
    keywords: 'Maintenance, Maintenance RENTS.ma, Site en maintenance, Mise à jour plateforme de location',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/maintenance',
      title: 'En Maintenance - RENTS.ma | Nous serons bientôt de retour',
      description: 'Notre site est actuellement en maintenance. Veuillez revenir plus tard pour découvrir nos services améliorés.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique à la maintenance ou générique
          width: 1200,
          height: 630,
          alt: 'En Maintenance - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'En Maintenance - RENTS.ma | Nous serons bientôt de retour',
      description: 'Nous travaillons actuellement sur des améliorations. Revenez bientôt !',
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique à la maintenance ou générique
    },
    alternates: {
      canonical: 'https://rents.ma/fr/maintenance',
      languages: {
        en: 'https://rents.ma/en/maintenance',
        ar: 'https://rents.ma/ar/maintenance',
        fr: 'https://rents.ma/fr/maintenance',
      },
    },
  };
}

export default function MaintenancePage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="maintenance-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'En Maintenance - RENTS.ma',
            url: 'https://rents.ma/fr/maintenance',
            description: 'RENTS.ma est actuellement en maintenance. Nous serons bientôt de retour avec des fonctionnalités et des services améliorés.',
          }),
        }}
      />
      {/* Render Maintenance Content */}
      <MaintenanceView />
    </>
  );
}
