
import axios from 'axios';
import Script from 'next/script';
import { cookies } from 'next/headers';

import HomeView from 'src/sections/home/home-view';

// ----------------------------------------------------------------------




export const metadata = {
  title: 'RENTS.ma : Découvrez le principal marché de location au Maroc - Voitures, vélos, propriétés et plus encore',
  description: 'Explorez RENTS.ma, le principal marché de location au Maroc offrant une large gamme d’options de location, notamment des voitures, des vélos, des propriétés et des équipements. Trouvez des locations fiables avec des conditions flexibles dans des villes populaires du Maroc comme Marrakech, Casablanca et au-delà.',

  keywords: 'Locations au Maroc, Locations de voitures, Locations de propriétés, Locations de vélos, Locations d’équipements, Locations Marrakech, Locations Casablanca',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rents.ma/fr',
    title: 'RENTS.ma - Le meilleur marché de location au Maroc',
    description: 'Trouvez des options de location fiables pour des voitures, vélos, propriétés et équipements au Maroc.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // Provide a high-quality image for Open Graph
        width: 512,
        height: 512,
        alt: 'RENTS.ma - Découvrez le principal marché de location au Maroc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RENTS.ma - Le meilleur marché de location au Maroc',
    description: 'Découvrez RENTS.ma, votre destination unique pour des services de location fiables au Maroc.',
    image: '/favicon/android-chrome-512x512.png', // Use a Twitter-specific image
  },
  alternates: {
    canonical: 'https://rents.ma/fr',
    languages: {
      en: 'https://rents.ma/en',
      ar: 'https://rents.ma/ar',
      fr: 'https://rents.ma/fr',
    },
  },
};

export default async function HomePage() {






  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const homeEndpoint = `${API_URL}/home`;
  const authToken = cookies().get('authToken')?.value;


  try {
    // Fetch data server-side with Axios
    const response = await axios.get(homeEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
    });

    // Extract and pass data to PrivacyView
    const homeData = response.data;


    return (
      <>
        <Script
          type="application/ld+json"
          id="homepage-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Accueil - RENTS.ma",
              url: "https://rents.ma/fr",
              description:
                "Découvrez le principal marché de location au Maroc. Trouvez des voitures, vélos, propriétés et équipements à louer dans des villes comme Marrakech et Casablanca.",
            }),
          }}
        />

        <HomeView homeData={homeData} />
      </>
    );


  } catch (error) {
    console.error('Error fetching homeData:', error);


    return <HomeView homeData={null} />;
  }




}
