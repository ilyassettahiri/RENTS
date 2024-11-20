import NotFoundView from 'src/sections/error/not-found-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: '404 Page Not Found - RENTS.ma',
    description: 'The page you’re looking for doesn’t exist on RENTS.ma. Return to the homepage or explore our rental services.',
    keywords: '404 error, Page not found, RENTS.ma 404, Rental platform error',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/404',
      title: '404 Page Not Found - RENTS.ma',
      description: 'Sorry, we couldn’t find the page you’re looking for. Head back to RENTS.ma and explore our rental services.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a 404-specific or generic image
          width: 1200,
          height: 630,
          alt: '404 Page Not Found - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '404 Page Not Found - RENTS.ma',
      description: 'The page you’re looking for isn’t available. Return to RENTS.ma and explore our services.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a 404-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/404',
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
            name: '404 Page Not Found - RENTS.ma',
            url: 'https://rents.ma/en/404',
            description: 'The requested page is not found on RENTS.ma. Return to the homepage or explore our services.',
          }),
        }}
      />
      {/* Render 404 Page Content */}
      <NotFoundView />
    </>
  );
}
