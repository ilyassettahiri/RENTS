import ServicesView from 'src/sections/services-list/services-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Services au Maroc - Prestataires de Confiance sur RENTS.ma',
  description:
    'Découvrez une large gamme de services professionnels au Maroc sur RENTS.ma. De l’entretien de la maison aux soins personnels, connectez-vous avec des prestataires fiables pour répondre à vos besoins.',
  keywords: 'Services professionnels au Maroc, Services d’entretien de maison, Services de soins personnels, Prestataires de confiance au Maroc, Services sur RENTS.ma',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rents.ma/fr/services',
    title: 'Services au Maroc - Prestataires de Confiance sur RENTS.ma',
    description:
      'Explorez des services professionnels fiables au Maroc. Connectez-vous avec des prestataires de confiance pour l’entretien de la maison, les soins personnels, et plus encore.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique pour les services
        width: 1200,
        height: 630,
        alt: 'Services au Maroc - Prestataires de Confiance sur RENTS.ma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services au Maroc - Prestataires de Confiance sur RENTS.ma',
    description:
      'Découvrez des services professionnels au Maroc. Connectez-vous avec des prestataires fiables pour l’entretien de la maison, les soins personnels, et plus encore.',
    image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique ou générique pour les services
  },
  alternates: {
    canonical: 'https://rents.ma/fr/services',
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
            name: 'Services au Maroc | RENTS.ma',
            url: 'https://rents.ma/fr/services',
            description:
              'Découvrez des services professionnels fiables au Maroc. Connectez-vous avec des prestataires pour l’entretien de la maison, les soins personnels, et plus encore.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Services d’Entretien de Maison',
                  url: 'https://rents.ma/fr/services/entretien-maison',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Services de Soins Personnels',
                  url: 'https://rents.ma/fr/services/soins-personnels',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Services de Nettoyage',
                  url: 'https://rents.ma/fr/services/nettoyage',
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
