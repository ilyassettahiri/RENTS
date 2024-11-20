import ComingSoonView from 'src/sections/status/coming-soon-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'À Venir - RENTS.ma | Des Mises à Jour Excitantes en Approche',
    description: 'Restez connecté pour découvrir les mises à jour passionnantes de RENTS.ma. De nouvelles fonctionnalités et services arrivent bientôt !',
    keywords: 'À venir, Mises à jour RENTS.ma, Nouvelles fonctionnalités RENTS.ma, Services de location à venir',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/coming-soon',
      title: 'À Venir - RENTS.ma | Des Mises à Jour Excitantes en Approche',
      description: 'Découvrez les nouvelles fonctionnalités et mises à jour à venir sur RENTS.ma. Restez connecté pour en savoir plus !',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a coming-soon-specific or generic image
          width: 1200,
          height: 630,
          alt: 'À Venir - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'À Venir - RENTS.ma | Des Mises à Jour Excitantes en Approche',
      description: 'Restez informé des nouveautés à venir sur RENTS.ma. De nouvelles fonctionnalités et services arrivent bientôt !',
      image: '/favicon/android-chrome-512x512.png', // Replace with a coming-soon-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/coming-soon',
      languages: {
        en: 'https://rents.ma/en/coming-soon',
        ar: 'https://rents.ma/ar/coming-soon',
        fr: 'https://rents.ma/fr/coming-soon',
      },
    },
  };
}

export default function ComingSoonPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="coming-soon-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'À Venir - RENTS.ma',
            url: 'https://rents.ma/fr/coming-soon',
            description: 'Restez informé des dernières mises à jour et fonctionnalités à venir sur RENTS.ma.',
            potentialAction: {
              "@type": "InformAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/fr/coming-soon',
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
          }),
        }}
      />
      {/* Render Coming Soon Content */}
      <ComingSoonView />
    </>
  );
}
