
import axios from 'axios';
import Script from 'next/script';


import FaqsView from 'src/sections/faqs/faqs-view';


export async function generateMetadata() {
  return {
    title: 'FAQs - RENTS.ma | Help Center for Rentals in Morocco',
    description: 'Find answers to common questions about RENTS.ma. Get help with rentals, listings, and more in Morocco.',
    keywords: 'FAQs, RENTS.ma help, Rental FAQs, Frequently Asked Questions, Morocco rental platform',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/faqs',
      title: 'FAQs - RENTS.ma | Help Center for Rentals in Morocco',
      description: 'Explore RENTS.ma FAQs to find answers to your questions about renting cars, properties, and equipment in Morocco.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an FAQ-specific or generic image
          width: 1200,
          height: 630,
          alt: 'FAQs - RENTS.ma | Help Center for Rentals in Morocco',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FAQs - RENTS.ma | Help Center for Rentals in Morocco',
      description: 'Get answers to common questions about RENTS.ma rentals, listings, and more.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an FAQ-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/faqs',
      languages: {
        en: 'https://rents.ma/en/faqs',
        ar: 'https://rents.ma/ar/faqs',
        fr: 'https://rents.ma/fr/faqs',
      },
    },
  };
}

export default async function FaqsPage() {




  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const faqDatasEndpoint = `${API_URL}/faqs`;

  try {
    // Fetch data server-side with Axios
    const response = await axios.get(faqDatasEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract and pass data to PrivacyView
    const faqData = response.data;


    return (
      <>
        {/* Page-Specific Structured Data */}
        <Script
          type="application/ld+json"
          id="faqs-structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
        {/* Render FAQ Content */}
        <FaqsView faqData={faqData} />
      </>
    );



  } catch (error) {
    console.error('Error fetching faq:', error);


    return <FaqsView faqData={null} />;



  }




}
