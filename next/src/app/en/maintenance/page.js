import MaintenanceView from 'src/sections/status/maintenance-view';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    title: 'Under Maintenance - RENTS.ma | We’ll Be Back Soon',
    description: 'RENTS.ma is currently undergoing maintenance. We’ll be back shortly with improved features and services.',
    keywords: 'Maintenance, RENTS.ma maintenance, Website under maintenance, Rental platform updates',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/maintenance',
      title: 'Under Maintenance - RENTS.ma | We’ll Be Back Soon',
      description: 'Our website is currently under maintenance. Please check back later for improved services and features.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a maintenance-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Under Maintenance - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Under Maintenance - RENTS.ma | We’ll Be Back Soon',
      description: 'We’re currently working on improvements. Please check back shortly!',
      image: '/favicon/android-chrome-512x512.png', // Replace with a maintenance-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/maintenance',
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
            name: 'Under Maintenance - RENTS.ma',
            url: 'https://rents.ma/en/maintenance',
            description: 'RENTS.ma is currently undergoing maintenance. We’ll be back shortly with improved features and services.',
          }),
        }}
      />
      {/* Render Maintenance Content */}
      <MaintenanceView />
    </>
  );
}
