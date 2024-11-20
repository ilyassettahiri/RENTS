import BusinessListView from 'src/sections/business-list/business-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Stores - RENTS.ma | Discover Trusted Businesses in Morocco',
    description: 'Explore the top stores and businesses on RENTS.ma. Find trusted providers offering cars, properties, equipment, and more for rent in Morocco.',
    keywords: 'Stores in Morocco, RENTS.ma stores, Rental businesses, Trusted providers, Rental services in Morocco',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/stores',
      title: 'Stores - RENTS.ma | Discover Trusted Businesses in Morocco',
      description: 'Discover trusted businesses on RENTS.ma. Explore stores offering rentals for cars, properties, equipment, and more.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a store-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Stores - RENTS.ma | Discover Trusted Businesses in Morocco',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stores - RENTS.ma | Discover Trusted Businesses in Morocco',
      description: 'Explore the top stores and businesses on RENTS.ma. Find trusted providers offering cars, properties, equipment, and more for rent in Morocco.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a store-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/stores',
      languages: {
        en: 'https://rents.ma/en/stores',
        ar: 'https://rents.ma/ar/stores',
        fr: 'https://rents.ma/fr/stores',
      },
    },
  };
}

export default function BusinessListPage() {


  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="stores-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Stores - RENTS.ma',
            url: 'https://rents.ma/en/stores',
            description: 'Explore trusted businesses offering rental services on RENTS.ma. Discover cars, properties, equipment, and more.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Car Rentals Store',
                  url: 'https://rents.ma/en/stores/cars',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Property Rentals Store',
                  url: 'https://rents.ma/en/stores/properties',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Equipment Rentals Store',
                  url: 'https://rents.ma/en/stores/equipment',
                },
              ],
            },
          }),
        }}
      />
      {/* Render Stores Content */}
      <BusinessListView />
    </>
  );


}
