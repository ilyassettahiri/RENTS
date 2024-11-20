import View500 from 'src/sections/error/500-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: '500 Internal Server Error - RENTS.ma',
    description: 'Something went wrong on our end. Please try refreshing the page or return to the homepage of RENTS.ma.',
    keywords: '500 error, Internal server error, RENTS.ma server error, Rental platform issue',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/500',
      title: '500 Internal Server Error - RENTS.ma',
      description: 'We encountered a problem on our server. Please refresh the page or visit the homepage to continue exploring RENTS.ma.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a 500-specific or generic image
          width: 1200,
          height: 630,
          alt: '500 Internal Server Error - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '500 Internal Server Error - RENTS.ma',
      description: 'An error occurred on our server. Please try again later or head back to the homepage.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a 500-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/500',
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
            name: '500 Internal Server Error - RENTS.ma',
            url: 'https://rents.ma/en/500',
            description: 'A server error occurred on RENTS.ma. Please try refreshing the page or visit the homepage to continue exploring.',
          }),
        }}
      />
      {/* Render 500 Error Page Content */}
      <View500 />
    </>
  );
}
