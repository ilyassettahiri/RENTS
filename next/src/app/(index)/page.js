
import axios from 'axios';
import Script from 'next/script';

import HomeView from 'src/sections/home/home-view';

// ----------------------------------------------------------------------



export const metadata = {
  title: 'RENTS.ma: Discover Morocco’s Leading Marketplace for Rentals - Cars, Bikes, Properties & More',
  description: 'Explore RENTS.ma, Morocco’s top rental marketplace offering a wide range of rental options including cars, bikes, properties, and equipment. Find trusted rentals with flexible terms across Morocco’s popular cities like Marrakech, Casablanca, and beyond.',


  keywords: 'Rentals in Morocco, Car rentals, Property rentals, Bike rentals, Equipment rentals, Marrakech rentals, Casablanca rentals',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rents.ma/',
    title: 'RENTS.ma - Morocco’s Best Marketplace for Rentals',
    description: 'Find trusted rental options for cars, bikes, properties, and equipment in Morocco.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // Provide a high-quality image for Open Graph
        width: 512,
        height: 512,
        alt: 'RENTS.ma - Discover Morocco’s Leading Marketplace for Rentals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RENTS.ma - Morocco’s Best Marketplace for Rentals',
    description: 'Discover RENTS.ma, your one-stop destination for trusted rental services in Morocco.',
    image: '/favicon/android-chrome-512x512.png', // Use a Twitter-specific image
  },
  alternates: {
    canonical: 'https://rents.ma/',
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

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(homeEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
              name: "Home - RENTS.ma",
              url: "https://rents.ma/",
              description:
                "Discover Morocco’s leading marketplace for rentals. Find cars, bikes, properties, and equipment for rent in cities like Marrakech and Casablanca.",
            }),
          }}
        />


        <HomeView homeData={homeData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching homeData:', error);


    return (
      <HomeView
        homeData={{
          hero: {
            title: 'Discover the Best Rentals in Morocco',
            description: 'Explore cars, bikes, properties, and equipment for rent in Marrakech, Casablanca, and beyond.',
          },
          categories: [
            { name: 'Cars', description: 'Find the best car rentals in Morocco' },
            { name: 'Properties', description: 'Explore rental properties across Morocco' },
            { name: 'Bikes', description: 'Rent bikes for city tours and adventures' },
          ],
        }}
      />
    );




  }




}
