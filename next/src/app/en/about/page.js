
import axios from 'axios';
import Script from 'next/script';


import AboutView from 'src/sections/about/about-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'About Us - RENTS.ma | Discover Morocco’s Leading Rental Marketplace',
    description: 'Learn more about RENTS.ma, Morocco’s premier rental platform connecting users with trusted rental services for cars, properties, bikes, and equipment.',
    keywords: 'About RENTS.ma, Morocco rental platform, Car rentals Morocco, Property rentals Morocco, Equipment rentals Morocco',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/about',
      title: 'About Us - RENTS.ma | Discover Morocco’s Leading Rental Marketplace',
      description: 'Discover the story behind RENTS.ma, the leading marketplace for rentals in Morocco.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an About-specific image if available
          width: 1200,
          height: 630,
          alt: 'About Us - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us - RENTS.ma | Discover Morocco’s Leading Rental Marketplace',
      description: 'Learn more about RENTS.ma, Morocco’s trusted platform for connecting users with rental services.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an About-specific image if available
    },
    alternates: {
      canonical: 'https://rents.ma/en/about',
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
              name: 'About RENTS.ma',
              url: 'https://rents.ma/en/about',
              description: 'Learn more about RENTS.ma, Morocco’s trusted platform for rentals.',
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
