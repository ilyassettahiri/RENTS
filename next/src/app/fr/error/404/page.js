import NotFoundView from 'src/sections/error/not-found-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: '404 Page Introuvable - RENTS.ma',
    description: 'La page que vous recherchez n’existe pas sur RENTS.ma. Retournez à l’accueil ou explorez nos services de location.',
    keywords: 'Erreur 404, Page introuvable, RENTS.ma 404, Erreur plateforme de location',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/404',
      title: '404 Page Introuvable - RENTS.ma',
      description: 'Désolé, nous ne trouvons pas la page que vous recherchez. Retournez sur RENTS.ma et explorez nos services de location.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a 404-specific or generic image
          width: 1200,
          height: 630,
          alt: '404 Page Introuvable - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '404 Page Introuvable - RENTS.ma',
      description: 'La page que vous recherchez n’est pas disponible. Retournez sur RENTS.ma et explorez nos services.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a 404-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/404',
      languages: {
        en: 'https://rents.ma/en/404',
        ar: 'https://rents.ma/ar/404',
        fr: 'https://rents.ma/fr/404',
      },
    },
  };
}

export default function NotFoundPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="404-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: '404 Page Introuvable - RENTS.ma',
            url: 'https://rents.ma/fr/404',
            description: 'La page demandée est introuvable sur RENTS.ma. Retournez à l’accueil ou explorez nos services.',
          }),
        }}
      />
      {/* Render 404 Page Content */}
      <NotFoundView />
    </>
  );
}
