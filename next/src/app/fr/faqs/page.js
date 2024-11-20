import axios from 'axios';
import Script from 'next/script';

import FaqsView from 'src/sections/faqs/faqs-view';

export async function generateMetadata() {
  return {
    title: 'FAQs - RENTS.ma | Centre d’Aide pour les Locations au Maroc',
    description: 'Trouvez des réponses aux questions fréquemment posées sur RENTS.ma. Obtenez de l’aide pour les locations, les annonces et plus au Maroc.',
    keywords: 'FAQs, Aide RENTS.ma, Questions fréquentes, Plateforme de location Maroc',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/faqs',
      title: 'FAQs - RENTS.ma | Centre d’Aide pour les Locations au Maroc',
      description: 'Explorez les FAQs de RENTS.ma pour trouver des réponses à vos questions sur la location de voitures, propriétés et équipements au Maroc.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with an FAQ-specific or generic image
          width: 1200,
          height: 630,
          alt: 'FAQs - RENTS.ma | Centre d’Aide pour les Locations au Maroc',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FAQs - RENTS.ma | Centre d’Aide pour les Locations au Maroc',
      description: 'Trouvez des réponses aux questions courantes sur les locations, annonces et plus sur RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // Replace with an FAQ-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/faqs',
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

    // Extract and pass data to FaqsView
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
    console.error('Error fetching FAQ data:', error);

    return <FaqsView faqData={null} />;
  }
}
