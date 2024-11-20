import ServicesView from 'src/sections/services-list/services-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Services in Morocco - Trusted Providers on RENTS.ma',
  description:
    'Discover a wide range of professional services across Morocco on RENTS.ma. From home maintenance to personal care, connect with reliable providers to meet your needs nationwide.',
  keywords: 'Professional services in Morocco, Home maintenance services, Personal care services, Trusted service providers in Morocco, Services on RENTS.ma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rents.ma/en/services',
    title: 'Services in Morocco - Trusted Providers on RENTS.ma',
    description:
      'Explore reliable professional services in Morocco. Connect with trusted providers for home maintenance, personal care, and more.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // Replace with a services-specific or generic image
        width: 1200,
        height: 630,
        alt: 'Services in Morocco - Trusted Providers on RENTS.ma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services in Morocco - Trusted Providers on RENTS.ma',
    description:
      'Discover professional services across Morocco. Connect with reliable providers for home maintenance, personal care, and more.',
    image: '/favicon/android-chrome-512x512.png', // Replace with a services-specific or generic image
  },
  alternates: {
    canonical: 'https://rents.ma/en/services',
    languages: {
      en: 'https://rents.ma/en/services',
      ar: 'https://rents.ma/ar/services',
      fr: 'https://rents.ma/fr/services',
    },
  },
};


export default function ServicesPage() {


  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Services in Morocco | RENTS.ma',
            url: 'https://rents.ma/en/services',
            description:
              'Explore trusted professional services in Morocco. Connect with providers for home maintenance, personal care, and more.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Home Maintenance Services',
                  url: 'https://rents.ma/en/services/home-maintenance',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Personal Care Services',
                  url: 'https://rents.ma/en/services/personal-care',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Cleaning Services',
                  url: 'https://rents.ma/en/services/cleaning',
                },
              ],
            },
          }),
        }}
      />
      {/* Render Services Content */}
      <ServicesView />
    </>
  );


}
