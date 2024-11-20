import ComingSoonView from 'src/sections/status/coming-soon-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Coming Soon - RENTS.ma | Exciting Updates Await',
    description: 'Stay tuned for exciting updates from RENTS.ma. Our latest features and services are coming soon!',
    keywords: 'Coming soon, RENTS.ma updates, New features RENTS.ma, Rental services updates',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/coming-soon',
      title: 'Coming Soon - RENTS.ma | Exciting Updates Await',
      description: 'Discover the latest features and updates coming to RENTS.ma. Stay tuned for more!',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a coming-soon-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Coming Soon - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Coming Soon - RENTS.ma | Exciting Updates Await',
      description: 'Stay updated on what’s coming next at RENTS.ma. New features and services are on the way!',
      image: '/favicon/android-chrome-512x512.png', // Replace with a coming-soon-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/coming-soon',
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
            name: 'Coming Soon - RENTS.ma',
            url: 'https://rents.ma/en/coming-soon',
            description: 'Stay tuned for the latest updates and features coming to RENTS.ma.',
            potentialAction: {
              "@type": "InformAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: 'https://rents.ma/en/coming-soon',
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
