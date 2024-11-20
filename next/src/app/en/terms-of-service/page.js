
import axios from 'axios';
import Script from 'next/script';


import TermconditionView from 'src/sections/termcondition/termcondition-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Terms of Service - RENTS.ma | Rental Platform Policies',
    description: 'Read the terms of service for using RENTS.ma. Learn about our policies, rules, and guidelines for a seamless experience.',
    keywords: 'Terms of service, RENTS.ma terms, Rental platform rules, Service policies, RENTS.ma guidelines',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/terms-of-service',
      title: 'Terms of Service - RENTS.ma | Rental Platform Policies',
      description: 'Understand the terms and policies that govern the use of RENTS.ma, Morocco’s leading rental marketplace.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a terms-of-service-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Terms of Service - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terms of Service - RENTS.ma | Rental Platform Policies',
      description: 'Learn about the rules and guidelines for using RENTS.ma. Explore our terms of service for a seamless experience.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a terms-of-service-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/terms-of-service',
      languages: {
        en: 'https://rents.ma/en/terms-of-service',
        ar: 'https://rents.ma/ar/terms-of-service',
        fr: 'https://rents.ma/fr/terms-of-service',
      },
    },
  };
}


export default async function TermconditionPage() {




  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {

    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    const termData = response.data;





    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="terms-of-service-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'Terms of Service - RENTS.ma',
              url: 'https://rents.ma/en/terms-of-service',
              description: 'Understand the terms and policies for using RENTS.ma, Morocco’s leading rental marketplace.',
            }),
          }}
        />
        {/* Render Terms of Service Content */}
        <TermconditionView termData={termData} />
      </>
    );


  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <TermconditionView termData={null} />;
  }




}
