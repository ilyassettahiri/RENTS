import BusinessListView from 'src/sections/business-list/business-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Magasins - RENTS.ma | Découvrez des Entreprises de Confiance au Maroc',
    description: 'Explorez les meilleurs magasins et entreprises sur RENTS.ma. Trouvez des fournisseurs de confiance proposant des voitures, propriétés, équipements et plus encore à louer au Maroc.',
    keywords: 'Magasins au Maroc, Magasins RENTS.ma, Entreprises de location, Fournisseurs de confiance, Services de location au Maroc',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/stores',
      title: 'Magasins - RENTS.ma | Découvrez des Entreprises de Confiance au Maroc',
      description: 'Découvrez des entreprises fiables sur RENTS.ma. Explorez des magasins proposant des locations de voitures, propriétés, équipements et plus encore.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
          width: 1200,
          height: 630,
          alt: 'Magasins - RENTS.ma | Découvrez des Entreprises de Confiance au Maroc',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Magasins - RENTS.ma | Découvrez des Entreprises de Confiance au Maroc',
      description: 'Explorez les meilleurs magasins et entreprises sur RENTS.ma. Trouvez des fournisseurs de confiance proposant des voitures, propriétés, équipements et plus encore à louer au Maroc.',
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique
    },
    alternates: {
      canonical: 'https://rents.ma/fr/stores',
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
            name: 'Magasins - RENTS.ma',
            url: 'https://rents.ma/fr/stores',
            description: 'Explorez des entreprises fiables proposant des services de location sur RENTS.ma. Découvrez des voitures, propriétés, équipements et plus encore.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Magasin de Location de Voitures',
                  url: 'https://rents.ma/fr/stores/cars',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Magasin de Location de Propriétés',
                  url: 'https://rents.ma/fr/stores/properties',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Magasin de Location d’Équipements',
                  url: 'https://rents.ma/fr/stores/equipment',
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
