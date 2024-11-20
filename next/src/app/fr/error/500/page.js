import View500 from 'src/sections/error/500-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: '500 Erreur Interne du Serveur - RENTS.ma',
    description: 'Un problème est survenu de notre côté. Veuillez rafraîchir la page ou retourner à la page d’accueil de RENTS.ma.',
    keywords: 'Erreur 500, Erreur interne du serveur, Problème serveur RENTS.ma, Problème plateforme de location',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/500',
      title: '500 Erreur Interne du Serveur - RENTS.ma',
      description: 'Nous avons rencontré un problème sur notre serveur. Veuillez rafraîchir la page ou retourner à la page d’accueil pour continuer à explorer RENTS.ma.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a 500-specific or generic image
          width: 1200,
          height: 630,
          alt: '500 Erreur Interne du Serveur - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '500 Erreur Interne du Serveur - RENTS.ma',
      description: 'Une erreur est survenue sur notre serveur. Veuillez réessayer plus tard ou retourner à la page d’accueil.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a 500-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/500',
      languages: {
        en: 'https://rents.ma/en/500',
        ar: 'https://rents.ma/ar/500',
        fr: 'https://rents.ma/fr/500',
      },
    },
  };
}

export default function Page500() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="500-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: '500 Erreur Interne du Serveur - RENTS.ma',
            url: 'https://rents.ma/fr/500',
            description: 'Une erreur de serveur est survenue sur RENTS.ma. Veuillez rafraîchir la page ou retourner à la page d’accueil pour continuer à explorer.',
          }),
        }}
      />
      {/* Render 500 Error Page Content */}
      <View500 />
    </>
  );
}
