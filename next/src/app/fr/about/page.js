
import axios from 'axios';
import Script from 'next/script';


import AboutView from 'src/sections/about/about-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'À propos de nous - RENTS.ma | Découvrez le principal marché de location au Maroc',
    description: 'En savoir plus sur RENTS.ma, la plateforme de location numéro un au Maroc connectant les utilisateurs à des services de location fiables pour les voitures, propriétés, vélos et équipements.',
    keywords: 'À propos de RENTS.ma, Plateforme de location au Maroc, Location de voitures au Maroc, Location de propriétés au Maroc, Location d’équipements au Maroc',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/about',
      title: 'À propos de nous - RENTS.ma | Découvrez le principal marché de location au Maroc',
      description: 'Découvrez l’histoire de RENTS.ma, le principal marché de location au Maroc.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an About-specific image if available
          width: 1200,
          height: 630,
          alt: 'À propos de nous - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'À propos de nous - RENTS.ma | Découvrez le principal marché de location au Maroc',
      description: 'En savoir plus sur RENTS.ma, la plateforme de confiance au Maroc pour connecter les utilisateurs à des services de location.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an About-specific image if available
    },
    alternates: {
      canonical: 'https://rents.ma/fr/about',
      languages: {
        en: 'https://rents.ma/en/about',
        ar: 'https://rents.ma/ar/about',
        fr: 'https://rents.ma/fr/about',
      },
    },
  };
}

export default async function AboutPage() {





  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const aboutsEndpoint = `${API_URL}/abouts`;

  try {

    const response = await axios.get(aboutsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    const aboutData = response.data;


    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="about-page-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: 'À propos de RENTS.ma',
              url: 'https://rents.ma/fr/about',
              description: 'En savoir plus sur RENTS.ma, la plateforme de confiance au Maroc pour les locations.',
              mainEntity: {
                "@type": "Organization",
                name: 'RENTS.ma',
                url: 'https://rents.ma',
                logo: 'https://rents.ma/favicon/android-chrome-192x192.png',
                sameAs: [
                  'https://facebook.com/rents.ma',
                  'https://instagram.com/rents.ma',
                  'https://twitter.com/rents_ma',
                ],
              },
            }),
          }}
        />
        <AboutView aboutData={aboutData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <AboutView aboutData={null} />;

  }


}
