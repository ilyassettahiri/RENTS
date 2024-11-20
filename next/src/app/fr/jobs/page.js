import JobsView from 'src/sections/jobs-list/jobs-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Emplois au Maroc - Trouvez des Opportunités sur RENTS.ma',
    description:
      'Explorez une large gamme d’opportunités d’emploi au Maroc sur RENTS.ma. Découvrez des postes dans divers secteurs et connectez-vous avec les meilleurs employeurs. Commencez votre recherche d’emploi dès aujourd’hui !',
    keywords: 'Emplois au Maroc, Offres d’emploi au Maroc, Opportunités de carrière, Secteurs marocains, Carrières sur RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/jobs',
      title: 'Emplois au Maroc - Trouvez des Opportunités sur RENTS.ma',
      description:
        'Découvrez les dernières opportunités d’emploi au Maroc. Trouvez des postes dans divers secteurs et connectez-vous avec les meilleurs employeurs.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique aux emplois ou générique
          width: 1200,
          height: 630,
          alt: 'Emplois au Maroc - Trouvez des Opportunités sur RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Emplois au Maroc - Trouvez des Opportunités sur RENTS.ma',
      description:
        'Explorez les offres d’emploi au Maroc. Connectez-vous avec les meilleurs employeurs et lancez votre carrière avec RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // Remplacez par une image spécifique aux emplois ou générique
    },
    alternates: {
      canonical: 'https://rents.ma/fr/jobs',
      languages: {
        en: 'https://rents.ma/en/jobs',
        ar: 'https://rents.ma/ar/jobs',
        fr: 'https://rents.ma/fr/jobs',
      },
    },
  };
}

export default function JobsPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="jobs-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'Emplois au Maroc - RENTS.ma',
            url: 'https://rents.ma/fr/jobs',
            description:
              'Explorez une large gamme d’opportunités d’emploi au Maroc. Découvrez des postes dans divers secteurs et connectez-vous avec les meilleurs employeurs.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'Emplois Développeur Logiciel',
                  url: 'https://rents.ma/fr/jobs/developpeur-logiciel',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'Emplois Marketing',
                  url: 'https://rents.ma/fr/jobs/marketing',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'Emplois Vente',
                  url: 'https://rents.ma/fr/jobs/vente',
                },
              ],
            },
          }),
        }}
      />
      {/* Render Jobs Content */}
      <JobsView />
    </>
  );
}
