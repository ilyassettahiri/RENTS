import axios from 'axios';
import Script from 'next/script';


import PrivacyView from 'src/sections/privacy/privacy-view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Privacy Policy - RENTS.ma | Your Data, Our Responsibility',
    description: 'Learn how RENTS.ma handles your data with transparency and care. Read our privacy policy to understand your rights and our practices.',
    keywords: 'Privacy policy, RENTS.ma privacy, Data handling, User privacy, Rental platform privacy policy',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/privacy-policy',
      title: 'Privacy Policy - RENTS.ma | Your Data, Our Responsibility',
      description: 'Understand how RENTS.ma protects your data and your rights. Transparency and care are at the heart of our practices.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a privacy-policy-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Privacy Policy - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - RENTS.ma | Your Data, Our Responsibility',
      description: 'Discover how RENTS.ma handles your personal information with care and transparency.',
      image: '/favicon/android-chrome-512x512.png', // Replace with a privacy-policy-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/privacy-policy',
      languages: {
        en: 'https://rents.ma/en/privacy-policy',
        ar: 'https://rents.ma/ar/privacy-policy',
        fr: 'https://rents.ma/fr/privacy-policy',
      },
    },
  };
}


export default async function PrivacyPage() {



  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const termData = response.data;



    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="privacy-policy-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: 'Privacy Policy - RENTS.ma',
              url: 'https://rents.ma/en/privacy-policy',
              description: 'Learn how RENTS.ma handles your personal information with transparency and care.',
            }),
          }}
        />
        {/* Render Privacy Policy Content */}
        <PrivacyView termData={termData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <PrivacyView termData={null} />;
  }


}
